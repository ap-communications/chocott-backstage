locals {
  resource_group_name  = "rg-${var.prefix}"
  storage_account_name = "st${var.prefix}"
  cosmosdb_name        = "cosmos-${var.prefix}"
  location             = "japaneast"
}
