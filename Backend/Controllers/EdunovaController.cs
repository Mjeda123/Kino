using AutoMapper;
using Backend.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Authorize]
    public abstract class EdunovaController(EdunovaContext context, IMapper mapper) : ControllerBase
    {
        protected readonly EdunovaContext _contex = context;

        protected readonly IMapper _mapper = mapper;
    }
}
