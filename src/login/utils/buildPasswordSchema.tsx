import Joi from "joi";

type PasswordPolicies = {
  length?: number;
  maxLength?: number;
  upperCase?: number;
  lowerCase?: number;
  digits?: number;
  specialChars?: number;
};

const buildPasswordSchema = (
  passwordPolicies?: PasswordPolicies,
  customMessages: Record<string, string> = {}
) => {
  let passwordSchema = Joi.string();
  let pattern = "";

  const messages: Record<string, string> = {
    "string.empty": "Please specify password.",
    ...customMessages // si quieres sobrescribir mensajes
  };

  if (passwordPolicies?.length) {
    passwordSchema = passwordSchema.min(passwordPolicies.length);
    messages["string.min"] =
      `Password must be at least ${passwordPolicies.length} characters long.`;
  }

  if (passwordPolicies?.maxLength) {
    passwordSchema = passwordSchema.max(passwordPolicies.maxLength);
    messages["string.max"] =
      `Password cannot exceed ${passwordPolicies.maxLength} characters.`;
  }

  if (passwordPolicies?.upperCase)
    pattern += `(?=.*[A-Z]){${passwordPolicies.upperCase},}`;
  if (passwordPolicies?.specialChars)
    pattern += `(?=.*[!@#$%^&*]){${passwordPolicies.specialChars},}`;
  if (passwordPolicies?.lowerCase)
    pattern += `(?=.*[a-z]){${passwordPolicies.lowerCase},}`;
  if (passwordPolicies?.digits) pattern += `(?=.*[0-9]){${passwordPolicies.digits},}`;

  if (pattern) {
    const msg: string[] = [];
    passwordSchema = passwordSchema.pattern(new RegExp("^" + pattern));

    if (passwordPolicies?.specialChars)
      msg.push(`${passwordPolicies.specialChars} special character`);
    if (passwordPolicies?.lowerCase)
      msg.push(`${passwordPolicies.lowerCase} lowercase letter`);
    if (passwordPolicies?.upperCase)
      msg.push(`${passwordPolicies.upperCase} uppercase letter`);
    if (passwordPolicies?.digits) msg.push(`${passwordPolicies.digits} number`);

    messages["string.pattern.base"] =
      "Password must contain at least " + msg.join(", ") + ".";
  }

  return passwordSchema.messages(messages);
};

export default buildPasswordSchema;
