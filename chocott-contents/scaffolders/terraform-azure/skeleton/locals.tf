locals {
  resource_group_name  = "rg-${var.prefix}"
  storage_account_name = "st${substr(var.prefix, 0, 22)}"
  cosmosdb_name        = "cosmos-${var.prefix}"
  location             = "japaneast"
}
