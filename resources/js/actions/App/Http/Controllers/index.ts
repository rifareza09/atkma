import DashboardController from './DashboardController'
import NotificationController from './NotificationController'
import InventoryController from './InventoryController'
import BarangController from './BarangController'
import RuanganController from './RuanganController'
import TransactionController from './TransactionController'
import StockReconciliationController from './StockReconciliationController'
import IncomingStockController from './IncomingStockController'
import ReportController from './ReportController'
import SettingsController from './SettingsController'
import UserController from './UserController'
import AuditLogController from './AuditLogController'
import Settings from './Settings'
const Controllers = {
    DashboardController: Object.assign(DashboardController, DashboardController),
NotificationController: Object.assign(NotificationController, NotificationController),
InventoryController: Object.assign(InventoryController, InventoryController),
BarangController: Object.assign(BarangController, BarangController),
RuanganController: Object.assign(RuanganController, RuanganController),
TransactionController: Object.assign(TransactionController, TransactionController),
StockReconciliationController: Object.assign(StockReconciliationController, StockReconciliationController),
IncomingStockController: Object.assign(IncomingStockController, IncomingStockController),
ReportController: Object.assign(ReportController, ReportController),
SettingsController: Object.assign(SettingsController, SettingsController),
UserController: Object.assign(UserController, UserController),
AuditLogController: Object.assign(AuditLogController, AuditLogController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers