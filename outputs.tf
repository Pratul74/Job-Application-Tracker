output "node1_public_ip" {
    value = aws_instance.my_aws_instance1.public_ip 
}

output "node1_private_ip" {
  value = aws_instance.my_aws_instance1.private_ip
}

output "master_node_public_ip" {
    value = aws_instance.my_aws_instance2.public_ip 
}

output "master_node_private_ip" {
  value = aws_instance.my_aws_instance2.private_ip
}

