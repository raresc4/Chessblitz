using backend.Models;
using Microsoft.Extensions.Options;
using System.IdentityModel.Tokens.Jwt;

namespace backend.Services
{
    using Microsoft.IdentityModel.Tokens;
    using System.Security.Claims;
    using System.Text;

    public class JwtService
    {
        private readonly string _jwtSecret;

        public JwtService(IOptions<GetJwtKey> options) {
            _jwtSecret = options.Value.Key;
        }

        public string GenerateJwtToken(string name)
        {
            try
            {
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSecret));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var claim = new List<Claim> { new Claim(ClaimTypes.NameIdentifier, name) };

                var jwtToken = new JwtSecurityToken(
                    claims: claim,
                    notBefore: DateTime.UtcNow,
                    expires: DateTime.UtcNow.AddDays(30),
                    signingCredentials: creds);

                return jwtToken.EncodedPayload;
            } catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
