variable "prefix" {
  description = "Azureリソース名に使用するプレフィックス（英小文字・数字のみ、3〜22文字）"
  type        = string

  validation {
    condition     = can(regex("^[a-z0-9]{3,22}$", var.prefix))
    error_message = "prefix は英小文字・数字のみで3〜22文字の範囲で指定してください。"
  }
}
