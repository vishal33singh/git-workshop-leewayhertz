import auth0 from "auth0-js";
import { history } from "../managers/history";
import { UserModel } from "../models/user";
import { getUserInfo } from "./user";
export default class Auth0Service {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      redirectUri: process.env.REACT_APP_AUTH0_REDIRECT_URI,
      scope: process.env.REACT_APP_AUTH0_SCOPE,
      responseType: process.env.REACT_APP_AUTH0_RESPONSE_TYPE,
      grantType: process.env.REACT_APP_AUTH0_GRANT_TYPE,
    });
  }

  signin(username, password) {
    let _this = this;
    return new Promise((resolve, reject) => {
      this.auth0.client.login(
        { realm: "Username-Password-Authentication", username, password },
        function (err, authResult) {
          if (err) {
            return reject(err);
          }
          // setSession(authResult);
          _this.auth0.client.userInfo(
            authResult.accessToken,
            async (err, user) => {
              if (err) {
                return reject(err);
              }
              const userId = user.sub.split("auth0|")[1];
              try {
                const userDetails = await getUserInfo(userId);
                if (!userDetails) {
                  throw "User not found";
                }
                resolve({
                  accessToken: authResult.idToken,
                  userDetails: new UserModel({
                    ...userDetails,
                    image: userDetails.image ? userDetails.image : user.picture,
                  }),
                });
              } catch (err) {
                reject(err);
              }
            }
          );
        }
      );
    });
  }

  logout() {
    // this.auth0.logout({
    //   returnTo: process.env.REACT_APP_WEBAPP_URL,
    // });
    history.push("/");
  }
}
