import { Injectable } from '@nestjs/common';
import AWS from 'aws-sdk';
const s3 = new AWS.S3({ region: process.env.AWS_REGION });

@Injectable()
export class S3Service {
  async uploadBuffer(key: string, buffer: Buffer, contentType: string) {
    await s3.putObject({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      ACL: 'private'
    }).promise();
    return key;
  }
  getPresignedUrl(key: string, expiresSec = 60) {
    return s3.getSignedUrl('getObject', {
      Bucket: process.env.S3_BUCKET,
      Key: key,
      Expires: expiresSec
    });
  }
}
