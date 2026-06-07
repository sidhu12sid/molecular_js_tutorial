const userSchema = {
    firstName: { type: "string", min: 1, max: 50 },
    lastName: { type: "string", min: 1, max: 50 },
    email: { type: "email" },
    password: {
        type: "string", min: 8,
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/
    },
    otp: { type: "string", optional: true },
    otpExpirationTime: { type: "date", optional: true },
    isVerified: { type: "boolean", default: false },
    createdAt: { type: "date", optional: true },
    updatedAt: { type: "date", optional: true },
};

module.exports = userSchema;