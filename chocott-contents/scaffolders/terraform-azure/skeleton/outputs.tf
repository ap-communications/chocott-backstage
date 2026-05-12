output "resource_group_name" {
  description = "作成されたResource Groupの名前"
  value       = azurerm_resource_group.main.name
}

output "storage_account_name" {
  description = "作成されたStorage Accountの名前"
  value       = azurerm_storage_account.main.name
}

output "cosmosdb_name" {
  description = "作成されたCosmosDBアカウントの名前"
  value       = azurerm_cosmosdb_account.main.name
}
