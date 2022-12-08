public with sharing class ReportViewLightningController {
    @AuraEnabled
    public static String runReport(){
        Report rep = [SELECT Id, DeveloperName FROM Report WHERE DeveloperName = 'Wealth_Metrics_Asset_Holdings_by_Fund_pnZ' LIMIT 1];
        return JSON.serialize(Reports.ReportManager.runReport(rep.Id, true));
    }
}
