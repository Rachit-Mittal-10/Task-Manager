import crypto from "crypto";

const TOKEN_BYTES = 48;

const encodeBase64Token = (bytes = TOKEN_BYTES) => {
    return crypto.randomBytes(bytes).toString("base64");
};

const mode = process.argv[2] || "all";

switch (mode) {
    case "refresh": {
        const refreshToken = encodeBase64Token();
        console.log(`refreshToken = ${refreshToken}`);
        break;
    }
    case "access": {
        const accessToken = encodeBase64Token();
        console.log(`accessToken = ${accessToken}`);
        break;
    }
    case "all": {
        const accessToken = encodeBase64Token();
        const refreshToken = encodeBase64Token();
        console.log(`accessToken=${accessToken}`);
        console.log(`refreshToken=${refreshToken}`);
        break;
    }
    default: {
        console.error("Invalid mode. Use one of: all, refresh, access");
        process.exitCode = 1;
    }
}
