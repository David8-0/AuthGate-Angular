import { Component } from '@angular/core';

@Component({
  selector: 'app-developer',
  standalone: true,
  imports: [],
  templateUrl: './developer.component.html',
  styleUrl: './developer.component.css'
})
export class DeveloperComponent {

  code:string=`  [HttpGet("{id}")]
        public IActionResult getById(string id)
        {
            var rent=_unitOfWork.CustomerRentCarRepo.getByStringId(id);
            if (rent == null) return BadRequest();
            var dto = getCarRentDTO(rent);
            ReturnDTO<CustomerRentCarDTO> returnDTO = new ReturnDTO<CustomerRentCarDTO>();
            returnDTO.totalResults = 1;
            var res = new List<CustomerRentCarDTO>() { dto };
            returnDTO.Data=res;
            return Ok(returnDTO);
        }
            [HttpPost]
        async public Task<IActionResult> Add(CustomerRentCarDTO dto)
        {
            var res = await getCustomerRentCarModel(dto);
            if(res == null) return BadRequest();
            res.ReservationNumber = DateTime.Now.ToString("HHmmssddMMyyyy") + res.Customer.Id;

            _unitOfWork.CustomerRentCarRepo.Add(res);
            _unitOfWork.saveChanges();
            return Created();
        }

        [HttpPatch]
        async public Task<IActionResult> Update(CustomerRentCarDTO dto)
        {
            var rent = await getCustomerRentCarModel(dto);
            if (rent == null) return BadRequest();
             _unitOfWork.CustomerRentCarRepo.update(rent);
            _unitOfWork.saveChanges();
            return Ok(rent);
        }
        [HttpDelete]
        public IActionResult Delete(string id) {
            var rent = _unitOfWork.CustomerRentCarRepo.getByStringId(id);
            if (rent == null) return BadRequest();
            _unitOfWork.CustomerRentCarRepo.delete(rent);
            _unitOfWork.saveChanges();
            return Ok();
        }`




        copyCode(){
          navigator.clipboard.writeText(this.code);
        }
}


