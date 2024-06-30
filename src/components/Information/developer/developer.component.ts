import { Component } from '@angular/core';
import { CodeComponent } from '../code/code.component';
import { TabsComponent } from '../tabs/tabs.component';

@Component({
    selector: 'app-developer',
    standalone: true,
    imports: [CodeComponent, TabsComponent],
    templateUrl: './developer.component.html',
    styleUrl: './developer.component.css',
})
export class DeveloperComponent {


    code1: string = `
    {
        clientID: string,
        clientSECRET: string
    }`

    code2: string = `
    {
        callbackUrl: string
    }`

    code3: string = `
    {
        authCode: string,
        codeVerifier: string
    }`

    code4: string = `
    {
        Auth_token: string
    }`

    code5: string = `
    {
        token: string
    }`

    code6: string = `
    {
        AuthCode: string,
        CodeVerifier: string
    }`

    ngAuthService: string = `
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as jwtdecode from 'jwt-decode';
import * as CryptoJS from 'crypto-js';
        
        
@Injectable({
    providedIn: 'root'
})
        
export class AuthService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;

    private readonly baseUrl = /* Your backend URL */;
    private readonly authgateBackendUrl = "http://localhost:3000";

    private readonly clientID: string = /* Your Client ID */;
    private readonly clientSECRET: string = /* Your Client Secret */;


    constructor(private http: HttpClient, private router: Router) {
        this.userSubject = new BehaviorSubject<User | null>(null);
        this.user = this.userSubject.asObservable();
    }

    loginWithAuthGate(): Observable<any> {
        const clientCredentials: any = {
            clientID: this.clientID,
            clientSECRET: this.clientSECRET,
        }
        const codeVerifier = this.generateCodeVerifier();
        localStorage.setItem('code_verifier', codeVerifier);
        return this.http.post<any>(this.authgateBackendUrl + "/tenants/authorize-client", clientCredentials)
    }
          
    decodeTokenToUser(token: string): User {
        const payload: { id: string, userName: string, email: string, age: number, phoneNumber: string } = jwtdecode.jwtDecode(token);
        const user: User = {
            id: payload.id,
            userName: payload.userName,
            email: payload.email,
            age: payload.age,
            phoneNumber: payload.phoneNumber
        };
        return user;
    }
        
    maintainUserState(token: string, user: User): void {
        localStorage.setItem('token', token);
        this.userSubject.next(user);
    }
        
    logOut() {
        localStorage.removeItem('token');
        this.userSubject.next(null);
    }
        
    exchangeCodeWithToken(authCode: string): Observable<any> {
        const authCodeObj: any = {
            authCode: authCode,
            codeVerifier: localStorage.getItem('code_verifier')
        }
        return this.http.post<any>(this.baseUrl + "codeWithToken", authCodeObj);
    }
        
    generateCodeVerifier(): string {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
        const minLength = 43;
        const maxLength = 128;
        let verifier = '';
        const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
        for (let i = 0; i < length; i++) {
            verifier += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        localStorage.setItem('code_verifier', verifier);
        return verifier;
    }
        
    generateCodeChallenge(verifier: string): string {    
        const hashed = CryptoJS.SHA256(verifier);
        return hashed.toString(CryptoJS.enc.Base64);
    }
}
`

    ngLoginTs: string = `
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {

  authCode: string | null = null;

  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9]{3,12}/)])
  });

  constructor(public authService: AuthService, public router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.authCode = params.get('authCode');
      if (this.authCode) {
        this.exchangeCodeWithToken(this.authCode);
      }
    })
  }

  loginWithAuthGate() {
    this.authService.loginWithAuthGate().subscribe({
      next: (response) => {
        const authgateLoginPage: string = response.data.callbackUrl;
        const codeVerifier = localStorage.getItem('code_verifier');

        if (codeVerifier) {
          const codeChallenge = this.authService.generateCodeChallenge(codeVerifier);
          const newRedirectUrl = authgateLoginPage + "/" + codeChallenge;
          window.location.href = newRedirectUrl;
        } else {
          window.location.href = authgateLoginPage;
        }
      }
    })
  }

  exchangeCodeWithToken(authCode: string) {
    this.authService.exchangeCodeWithToken(authCode).subscribe({
      next: response => {
        const token = JSON.stringify(response.token);

        if (token) {
          const user = this.authService.decodeTokenToUser(token);
          this.authService.maintainUserState(token, user)
        }

        if (this.authService.user != null) {
          this.router.navigate(["/"]);
        }
      }
    })
  }
}
`

    ngLoginHtml: string = `
<div class="d-flex flex-wrap bg-dark min-vh-100 rounded" id="imgDiv">
    <div class="d-flex flex-column justify-content-center align-items-center custom-width bg-dark">
        <h3 class="fw-bold text-light">Sign in</h3>
        <div class="w-75 d-flex justify-content-center">
            <button class="btn btn-light d-flex justify-content-around mt-3 p-2 w-75">
                <div class="mx-1">
                    <!-- <img src="assets/svgs/AuthgateLogo.svg" class="svgProperties" alt="AuthGate Logo"> -->
                </div>
                <div class="mx-1 fw-bold" (click)="loginWithAuthGate()">
                    Continue with AuthGate
                </div>
            </button>
        </div>
    </div>
</div>
`

    ngAppRoutes: string = `
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { noAuthGuard } from './guards/no-auth.guard';
import { authGuard } from './guards/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent, canActivate: [noAuthGuard] },
    { path: 'login/:authCode', component: LoginComponent, canActivate: [noAuthGuard] },
    {
        path: "**", component: NotFoundComponent
    }
];
`

    angularHeaders: string[] = ["auth.service.ts", "login.component.ts", "login.component.html", "app.routes.ts"];
    angularContents: string[] = [this.ngAuthService, this.ngLoginTs,  this.ngLoginHtml, this.ngAppRoutes];

    csAccountController: string = `
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
                        // issuer: _config["JWT:ValidIssuer"],  //url web api 
                        // audience: _config["JWT:ValidAudiance"], //url consumer angular
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
}    
`

    csProgram: string = `
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Sample_Server.Models;

string allowCors = "";

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddHttpClient();

builder.Services.AddDbContext<SampleDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("SampleConnection")));
builder.Services.AddIdentity<ApplicationUser, IdentityRole>().AddEntityFrameworkStores<SampleDbContext>();


builder.Services.AddCors(options =>
            {
                options.AddPolicy(allowCors, builder =>
                {
                    builder.AllowAnyOrigin();
                    builder.AllowAnyMethod();
                    builder.AllowAnyHeader();
                });
            });

builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }

            ).AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidIssuer = configuration["JWT:ValidIssuer"],
                    ValidateAudience = true,
                    ValidAudience = configuration["JWT:ValidAudiance"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]))
                };
            }
            );

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(allowCors);

app.MapControllers();

app.Run();
`
    cSharpHeaders: string[] = ["AccountController.cs", "Program.cs"];
    cSharpContents: string[] = [this.csAccountController, this.csProgram];
}


