import { supabase } from '@lib/supabaseClient'
import cookie from "cookie";

const handler = async (req, res) => {
const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return res.status(401).send("Unathorized");
  }

  const token = cookie.parse(req.headers.cookie)["sb-access-token"];

  supabase.auth.session = () => ({
    access_token: token,
  });
}

export default handler