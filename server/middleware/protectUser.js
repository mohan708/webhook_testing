import jwt from "jsonwebtoken";

export  const protectUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("RAW AUTH HEADER:", req.headers.authorization);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // 🔥 attach userId to request
    req.userId = decoded.id;

    console.log("AUTH HEADER:", authHeader);
   console.log("DECODED TOKEN:", decoded);

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token invalid",
    });
  }
};
