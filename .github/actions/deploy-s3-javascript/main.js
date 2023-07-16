const core = require('@actions/core')
const github = require('@actions/github')
const exec = require('@actions/exec')

function run(){
    // Get input values
    const bucketName = core.getInput('bucket-name', { required: true });
    const bucketRegion = core.getInput('bucket-region', { required: true });
    const distFolder = core.getInput('dist-folder', {required: true }); 


    // Upload files to S3
    const s3Uri = `s3://${bucketName}`;
    core.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);

    const websiteUrl = `http://${bucketName}.s3-website-${bucketRegion}.amazonaws.com`;
    core.setOutput('website-url', websiteUrl); // run: echo 'website-url=${websiteUrl}' >> $GITHUB_OUTPTU
}

run()