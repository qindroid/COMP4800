namespace WebApi.Authorization;

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
        var token = context.Request.Headers["token"];
        Console.WriteLine(token + " is the token");
    
        var userId = jwtUtils.ValidateToken(token);
        Console.WriteLine(userId + " is the userId");
        if (userId != null)
        {
            // attach user to context on successful jwt validation
            context.Items["User"] = userService.GetById(userId);
        }

        await _next(context);
    }
}