variable "ec2_instance_type" {
  default = "t3.micro"
  type = string
}

variable "root_storage_size" {
    default = 10
    type = number
}

variable "ec2_ami" {
  default = "ami-0116e140616be811c"
  type = string
}