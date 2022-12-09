public with sharing class ReportViewLightningController {
    @AuraEnabled
    public static String runReport(){
        Report rep = [SELECT Id, DeveloperName FROM Report WHERE DeveloperName = 'Wealth_Metrics_Asset_Holdings_by_Fund_pnZ' LIMIT 1];
        Reports.ReportDescribeResult describe = Reports.ReportManager.describeReport(rep.Id);
		Reports.ReportMetadata reportMd = describe.getReportMetadata();
        /*
    	[column=FK_Contract.Advisor_ID__c, filterType=fieldValue, operator=equals, value=12121]
		*/

        reportMd.getReportFilters().add(new Reports.ReportFilter('FK_ACC_ID', 'equals', '0014c000006f6C3AAI') );
        System.debug('JSON is ' + Reports.ReportManager.runReport(rep.Id, reportMd, true));
        return JSON.serialize(Reports.ReportManager.runReport(rep.Id, reportMd, true));
        
        //return JSON.serialize(Reports.ReportManager.runReport(rep.Id, true));
    }
}
