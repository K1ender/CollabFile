import { S3 } from "@aws-sdk/client-s3";

if (
	process.env.S3_ACCESS_KEY === undefined ||
	process.env.S3_SECRET_KEY === undefined
) {
	throw new Error("Missing S3 credentials");
}

export const client = new S3({
	endpoint: process.env.S3_ENDPOINT_URL,
	region: process.env.S3_REGION,
	credentials: {
		accessKeyId: process.env.S3_ACCESS_KEY,
		secretAccessKey: process.env.S3_SECRET_KEY,
	},
	forcePathStyle: true,
});
