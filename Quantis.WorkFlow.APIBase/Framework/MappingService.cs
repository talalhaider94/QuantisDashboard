using Quantis.WorkFlow.Services.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Quantis.WorkFlow.APIBase.Framework
{
    public abstract class MappingService<DTO,Entity> : IMappingService<DTO, Entity>
    {
        public abstract DTO GetDTO(Entity e);
        public abstract Entity GetEntity(DTO o,Entity e);

        public List<DTO> GetDTOs(List<Entity> e)
        {
            return e.Select(p => GetDTO(p)).ToList();
        }
    }
}
