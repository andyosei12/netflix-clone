import type { NextApiRequest, NextApiResponse } from "next";
import { magicAdmin } from "../../lib/magic";
import jwt from "jsonwebtoken";

import { isNewUser, createNewUser } from "../../lib/db/hasura";
import { setTokenCookie } from "../../lib/cookies";

type Data = {
  done: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      const auth = req.headers.authorization;
      const token = auth ? auth.slice(7) : "";

      const metadata = await magicAdmin.users.getMetadataByToken(token);

      // create jwt
      const jwtToken = jwt.sign(
        {
          ...metadata,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
          "https://hasura.io/jwt/claims": {
            "x-hasura-allowed-roles": ["user", "admin"],
            "x-hasura-default-role": "user",
            "x-hasura-user-id": `${metadata.issuer}`,
          },
        },
        `${process.env.JWT_SECRET}`
      );

      const isNewUserQuery = await isNewUser(jwtToken, metadata.issuer);

      isNewUserQuery && (await createNewUser(jwtToken, metadata));
      setTokenCookie(jwtToken, res);

      res.send({ done: true });
    } catch (error) {
      console.log("Something went wrong");
      res.status(500).send({ done: false });
    }
  } else {
    res.send({ done: false });
  }
}
