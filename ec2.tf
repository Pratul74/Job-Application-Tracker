resource "aws_key_pair" "my_key_pair" {
    key_name = "my_key_pair"
  public_key = file("terraform-key.pub")
}

resource "aws_default_vpc" "default" {
  
}

resource "aws_security_group" "my_security_group1" {
  vpc_id = aws_default_vpc.default.id
  name = "security-group1"
  ingress {
    from_port = 80
    to_port = 80
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = " Allow Http"
  }

  ingress {
    from_port = 22
    to_port = 22
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow ssh"
  }

  ingress {
    from_port = 443
    to_port = 443
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow Https"
  }

  ingress {
    from_port = 8000
    to_port = 8000
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Django app"
  }

  ingress {
    from_port = 5432
    to_port = 5432
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Postgresql db"
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow all"
  }
  
}

resource "aws_security_group" "my_security_group2" {
  vpc_id = aws_default_vpc.default.id
  name = "security-group2"

  ingress {
    to_port = 22
    from_port = 22
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow ssh"
  }
  ingress {
    to_port = 8080
    from_port = 8080
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow Jenkins"
  }
  ingress {
    to_port = 80
    from_port = 80
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow Http"
  }
  ingress {
    to_port = 443
    from_port = 443
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow Https"
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow all"
  }
  
}



resource "aws_instance" "my_aws_instance1" {
  key_name = aws_key_pair.my_key_pair.key_name
  security_groups = [aws_security_group.my_security_group.name]
  ami = "ami-024ebedf48d280810"
  instance_type = "t3.small"
  root_block_device {
    volume_size = 30
    volume_type = "gp3"
  }
  tags = {
    name = "Node 1"
  }
  
}

resource "aws_instance" "my_aws_instance2" {
  key_name = aws_key_pair.my_key_pair.key_name
  ami = "ami-024ebedf48d280810"
  instance_type = "t3.small"
  security_groups = [aws_security_group.my_security_group2.name]
  root_block_device {
    volume_size = 30
    volume_type = "gp3"
  }

  tags = {
    name = "Master Node"
  }
  
}
