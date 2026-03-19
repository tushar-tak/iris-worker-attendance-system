exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    
    if (username === "Admin" && password === "123") {
      return res.json({ success: true, message: "Login successful" });
    }

    return res.status(401).json({ success: false, message: "Invalid credentials" });

  } catch (error) {
    res.status(500).json({ error: "Login error" });
  }
};