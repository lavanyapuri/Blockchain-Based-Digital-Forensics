//solidity version should be less than or equal to 0.8.19
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0;

contract ForensicReport
{
    
    string public name;

    uint public reportCount = 0;
    //uint256 code_modulus = 10**16;
    mapping(uint => SubjectReport) public subjectReports;

    struct SubjectReport
    {
        uint subject_id;
        //uint unique_subject_id;
        address owner;
        string subject_name;
        uint subject_age;
        string subject_sex;
        uint report_id;
        string caseNumber;
        string date;
        string location;
        string description;
        string evidence;
        string conclusions;
    }

    event subjectReportCreated(
        uint subject_id, 
        address owner,
        string subject_name, 
        uint subject_age, 
        string subject_sex,
        uint report_id,
        string caseNumber,
        string date,
        string location,
        string description,
        string evidence,
        string conclusions      
    );

    event subjectReportAccessed(
        uint subject_id, 
        address owner,
        string subject_name, 
        uint subject_age, 
        string subject_sex,
        uint report_id,
        string caseNumber,
        string date,
        string location,
        string description,
        string evidence,
        string conclusions      
    );

    constructor() public {
        name = "Project";
    }

    /*function generate_unique_id(
        uint _subject_id,
        string memory _subject_name,
        uint _subject_age,
        string memory _subject_sex
    ) public view returns (uint)
    {
        uint hash_id = uint(keccak256(abi.encodePacked(_subject_id, _subject_name, _subject_age, _subject_sex)));
        return hash_id % code_modulus;
    }*/

    function createReport(
        string memory _subject_name,
        uint _subject_age,
        string memory _subject_sex,
        uint _report_id,
        string memory _caseNumber,
        string memory _date,
        string memory _location,
        string memory _description,
        string memory _evidence,
        string memory _conclusions
    ) public 
    {
        //Require a valid subject name and age
        require(bytes(_subject_name).length > 0 && _subject_age > 0);
        //Require a valid report id
        require(_report_id > 0);
        //Increment report count
        reportCount ++;
        //Generate unique id
        //uint _unique_id = generate_unique_id(reportCount,_subject_name,_subject_age,_subject_sex);
        //Create and add the report
        subjectReports[reportCount] = SubjectReport(reportCount, msg.sender, _subject_name, _subject_age, _subject_sex, _report_id, _caseNumber, _date, _location, _description, _evidence, _conclusions);
        //Trigger an event
        emit subjectReportCreated(reportCount, msg.sender, _subject_name, _subject_age, _subject_sex, _report_id, _caseNumber, _date, _location, _description, _evidence, _conclusions);
    }

    function requestAccess(
        uint _subject_id
    ) public
    {
        //Fetch the subject report 
        SubjectReport memory _report = subjectReports[_subject_id];
        //Fetch the owner
        address _pathologist = _report.owner;
        //Make sure that the subject id is valid
        require(_report.subject_id > 0 && _report.subject_id <= reportCount);
        // Require that pathologist is not request access
        require(_pathologist != msg.sender);
        //Take access
        _report.owner = msg.sender;
        //Update the list
        subjectReports[_subject_id] = _report;
        //Trigger an event
        emit subjectReportAccessed(reportCount, msg.sender, _report.subject_name, _report.subject_age, _report.subject_sex, _report.report_id, _report.caseNumber, _report.date, _report.location, _report.description, _report.evidence, _report.conclusions);
    }
}