using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace backend_cube_solo.Shared.Validators;

public class PasswordValidator : ValidationAttribute
{
    public override bool IsValid(object? value)
    {
        var input = value?.ToString();

        var messages = new List<string>();

        ErrorMessage = string.Empty;

        if (string.IsNullOrEmpty(input))
        {
            ErrorMessage = "Le mot de passe doit être renseigné";
            return false;
        }

        var hasNumber = new Regex(@"[0-9]{1,}");
        var hasUpperLetters = new Regex(@"[A-Z]{1,}");
        var hasLowerCase = new Regex(@"[a-z]{1,}");
        var hasEnoughChars = new Regex(@".{4,15}");
        var hasSymbol = new Regex(@"[.+*?!:;,^@/$(){}|]{1,}");

        if (hasNumber.IsMatch(input) == false)
        {
            messages.Add("Il manque des chiffres.");
        }
        if (hasUpperLetters.IsMatch(input) == false)
        {
            messages.Add("Il manque des lettres majuscules.");
        }
        if (hasLowerCase.IsMatch(input) == false)
        {
            messages.Add("Il manque des lettres minuscules.");
        }

        if (hasEnoughChars.IsMatch(input) == false)
        {
            messages.Add("On doit avoir entre 8 et 15 caractères.");
        }

        if (hasSymbol.IsMatch(input) == false)
        {
            messages.Add("Il manque des symboles.");
        }

        ErrorMessage = string.Join("\n", messages);

        return string.IsNullOrEmpty(ErrorMessage);
    }
}
