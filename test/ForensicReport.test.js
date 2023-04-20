const ForensicReport = artifacts.require('./ForensicReport.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('ForensicReport', ([deployer, pathologist, police]) => {
    let report

    before(async () => {
        report = await ForensicReport.deployed()
    })

    describe('deployment', async() => {
        it('deploys successfully', async() => {
            const address = await report.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('has a name', async() => {
            const name = await report.name()
            assert.equal(name, 'Project')
        })
    })

    describe('subject reports', async() => {
        let result, reportCount
        const subjectName = 'John Doe'
        const subjectAge = 35
        const subjectSex = 'Male'
        const reportId = 1001
        const caseNumber = 'CR001'
        const date = '2022-01-01'
        const location = 'New York'
        const description = 'A robbery case'
        const evidence = 'Fingerprints, CCTV footage'
        const conclusions = 'The suspect has been identified'
        before(async ()=> {
            result = await report.createReport(subjectName, subjectAge, subjectSex, reportId, caseNumber, date, location, description, evidence, conclusions, {from: pathologist})
            reportCount = await report.reportCount()
        })
        it('adds a new subject', async() => {
            const reportlist = await report.subjectReports(reportCount)

            assert.equal(reportlist.subject_id.toNumber(), reportCount.toNumber(), 'subject id is correct')
            assert.equal(reportlist.owner, pathologist, ' is correct')
            assert.equal(reportlist.subject_name, subjectName, 'subject name is correct')
            assert.equal(reportlist.subject_age, subjectAge, 'subject age is correct')
            assert.equal(reportlist.subject_sex, subjectSex, 'subject sex is correct')
            assert.equal(reportlist.report_id, reportId, 'report id is correct')
            assert.equal(reportlist.caseNumber, caseNumber, 'case number is correct')
            assert.equal(reportlist.date, date, 'date is correct')
            assert.equal(reportlist.location, location, 'location is correct')
            assert.equal(reportlist.description, description, 'description is correct')
            assert.equal(reportlist.evidence, evidence, 'evidence is correct')
            assert.equal(reportlist.conclusions, conclusions, 'conclusions are correct')

            //FAILURE: Subject must have a name
            await report.createReport('', subjectAge, subjectSex, reportId, caseNumber, date, location, description, evidence, conclusions, {from: pathologist}).should.be.rejected;
            //FAILURE: Subject must have valid age
            await report.createReport(subjectName, 0, subjectSex, reportId, caseNumber, date, location, description, evidence, conclusions, {from: pathologist}).should.be.rejected;
            //Failure: There should be a valid report id
            await report.createReport(subjectName, subjectAge, subjectSex, 0, caseNumber, date, location, description, evidence, conclusions, {from: pathologist}).should.be.rejected;
        })

        it('lists subjects reports', async() => {
            //SUCCESS
            assert.equal(reportCount, 1)
            const event = result.logs[0].args

            assert.equal(event.subject_id.toNumber(), reportCount.toNumber(), 'subject id is correct')
            assert.equal(event.owner, pathologist, ' is correct')
            assert.equal(event.subject_name, subjectName, 'subject name is correct')
            assert.equal(event.subject_age, subjectAge, 'subject age is correct')
            assert.equal(event.subject_sex, subjectSex, 'subject sex is correct')
            assert.equal(event.report_id, reportId, 'report id is correct')
            assert.equal(event.caseNumber, caseNumber, 'case number is correct')
            assert.equal(event.date, date, 'date is correct')
            assert.equal(event.location, location, 'location is correct')
            assert.equal(event.description, description, 'description is correct')
            assert.equal(event.evidence, evidence, 'evidence is correct')
            assert.equal(event.conclusions, conclusions, 'conclusions are correct')
        })

        it('grants access to view subject report', async() => {
            it('sells products', async () => {          
                // SUCCESS: Buyer makes purchase
                result = await report.requestAccess(reportCount, { from: police})
          
                // Check logs
                const event = result.logs[0].args
                assert.equal(event.subject_id.toNumber(), reportCount.toNumber(), 'subject id is correct')
                assert.equal(event.owner, police, ' is correct')
                assert.equal(event.subject_name, subjectName, 'subject name is correct')
                assert.equal(event.subject_age, subjectAge, 'subject age is correct')
                assert.equal(event.subject_sex, subjectSex, 'subject sex is correct')
                assert.equal(event.report_id, reportId, 'report id is correct')
                assert.equal(event.caseNumber, caseNumber, 'case number is correct')
                assert.equal(event.date, date, 'date is correct')
                assert.equal(event.location, location, 'location is correct')
                assert.equal(event.description, description, 'description is correct')
                assert.equal(event.evidence, evidence, 'evidence is correct')
                assert.equal(event.conclusions, conclusions, 'conclusions are correct')
          
                // FAILURE:
                await report.requestAccess(99, { from: police}).should.be.rejected;
                // FAILURE: 
                await report.requestAccess(reportCount, { from: deployer }).should.be.rejected;
                // FAILURE: 
                await report.requestAccess(reportCount, { from: pathologist}).should.be.rejected;
            })
        })
    })

})