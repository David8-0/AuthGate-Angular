import { Component } from '@angular/core';
import { CodeComponent } from '../code/code.component';

@Component({
    selector: 'app-developer',
    standalone: true,
    imports: [CodeComponent],
    templateUrl: './developer.component.html',
    styleUrl: './developer.component.css'
})
export class DeveloperComponent {

    accountController: string = `  
using Sample_Server.Models;
using Sample_Server.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Sample_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _config;
        private readonly HttpClient _httpClient;
        private readonly string apiUrl = "http://localhost:3000/auth/authcode";

        public AccountController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration config, HttpClient httpClient)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _config = config;
            _httpClient = httpClient;
        }

        [HttpPost("codeWithToken")]
        public async Task<IActionResult> ExchangeCodeWithToken(AuthCodeDto authCodeDto)
        {
            var jsonData = JsonConvert.SerializeObject(authCodeDto);

            var content = new StringContent(jsonData, Encoding.UTF8, "application/json");

            HttpResponseMessage response = await _httpClient.PostAsync(apiUrl, content);

            if (response.IsSuccessStatusCode)
            {
                string jsonResponse = await response.Content.ReadAsStringAsync();
                var authgateResponse = JsonConvert.DeserializeObject<AuthgateResponse>(jsonResponse);

                if (authgateResponse != null && authgateResponse.Data != null)
                {
                    string token = authgateResponse.Data.Auth_token;
                    var handler = new JwtSecurityTokenHandler();
                    var jwtSecurityToken = handler.ReadJwtToken(token);
                    AuthgateUserDto authgateUser = ExtractUserInfoFromToken(jwtSecurityToken);
                    bool isExistingUser = await IsExistingUser(authgateUser);

                    if (!isExistingUser)
                        await RegisterAuthgateUser(authgateUser);

                    JwtDto returnedJwtDto = await LoginAuthgateUser(authgateUser);

                    return Ok(returnedJwtDto);
                }
                else
                {
                    return BadRequest("Invalid response format");
                }
            }
            else
            {
                return StatusCode((int)response.StatusCode, response.ReasonPhrase);
            }
        }

        private AuthgateUserDto ExtractUserInfoFromToken(JwtSecurityToken token)
        {
            AuthgateUserDto authgateUser = new()
            {
                Email = token.Claims.First(claim => claim.Type == "email").Value,
                UserName = token.Claims.First(claim => claim.Type == "name").Value,
                PhoneNumber = token.Claims.First(claim => claim.Type == "phone").Value,
                Image = token.Claims.First(claim => claim.Type == "image").Value,
                Age = token.Claims.First(claim => claim.Type == "age").Value,
            };

            return authgateUser;
        }

        private async Task<bool> RegisterAuthgateUser(AuthgateUserDto authgateUser)
        {
            ApplicationUser newUser = new();
            var lastUserId = await _userManager.Users.OrderByDescending(u => u.Id)
                                                         .Select(u => u.Id)
                                                         .FirstOrDefaultAsync();
            lastUserId ??= "0";

            newUser.Id = (int.Parse(lastUserId) + 1).ToString();
            newUser.UserName = authgateUser.UserName;
            newUser.NormalizedUserName = authgateUser.UserName.ToUpper();
            newUser.Email = authgateUser.Email;
            newUser.NormalizedEmail = authgateUser.Email.ToUpper();
            newUser.Age = int.Parse(authgateUser.Age);
            newUser.PhoneNumber = authgateUser.PhoneNumber;

            IdentityResult result = await _userManager.CreateAsync(newUser, "Password123!");
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(newUser, "Client");
                return true;
            }
            return false;
        }

        private async Task<JwtDto> LoginAuthgateUser(AuthgateUserDto authgateUse)
        {
            ApplicationUser fetchedUser = await _userManager.FindByEmailAsync(authgateUse.Email);

            var claims = new List<Claim>();

            var roles = await _userManager.GetRolesAsync(fetchedUser);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.NameIdentifier, fetchedUser.Id));
                claims.Add(new Claim(ClaimTypes.Role, role));
                claims.Add(new Claim("id", fetchedUser.Id));
                claims.Add(new Claim("role", role));
                claims.Add(new Claim("email", fetchedUser.Email));
                claims.Add(new Claim("userName", fetchedUser.Id));
                claims.Add(new Claim("age", fetchedUser.Id));
                claims.Add(new Claim("phoneNumber", fetchedUser.Id));

            }

            SecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:Secret"]));

            SigningCredentials signincred = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            JwtSecurityToken mytoken =
                new JwtSecurityToken(
                        claims: claims,
                        expires: DateTime.Now.AddHours(5),
                        signingCredentials: signincred
                        );

            JwtDto returnedJwtDto = new()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(mytoken),
            };

            return returnedJwtDto;
        }

        private async Task<bool> IsExistingUser(AuthgateUserDto authgateUser)
        {
            ApplicationUser fetchedUser = await _userManager.FindByEmailAsync(authgateUser.Email);
            if (fetchedUser == null)
                return false;
            else
                return true;
        }
    }
}`


    // code2: string = `let x = new CustomerRentCar()`

    code1: string = `{
    clientID: string,
    clientSECRET: string
}`

    code2: string = `{
    callbackUrl: string
}`

    code3: string = `{
    authCode: string,
    codeVerifier: string
}`

    code4: string = `{
    Auth_token: string
}`

    code5: string = `{
    token: string
}`

    code6: string = `{
    AuthCode: string,
    CodeVerifier: string
}`

}

