namespace WebApi.Authorization;
using Microsoft.Net.Http.Headers;

using WebApi.Services;

public class JwtMiddleware
{
    private readonly RequestDelegate _next;

    public JwtMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context, IUserService userService, IJwtUtils jwtUtils)
    {
        var token = context.Request.Headers["token"].FirstOrDefault()?.Split(" ").Last();
        //show all content of the request
        Console.WriteLine(token + " is the token");            
        var userId = jwtUtils.ValidateToken(token);
        if (userId != null)
        {
            // attach user to context on successful jwt validation
            Console.WriteLine("userId is " + userId);
            context.Items["User"] = userService.GetById(userId);
        }



        await _next(context);
    }
}