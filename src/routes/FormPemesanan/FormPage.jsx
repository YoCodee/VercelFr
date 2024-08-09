import React from 'react'

const FormPage = () => {
  return (
    <div class="flex items-center justify-center p-4">
       
    <div class="mx-auto w-full max-w-[550px] bg-white">
    <div className="title w-full bg-cyan-500 px-4 py-6 text-center text-white font-extrabold mb-6">
        <h1>  Form Pemesanan </h1>
        </div>
        <form>
            <div class="mb-5">
                <label for="name" class="mb-3 block text-base font-medium text-[#07074D]">
                    Nama
                </label>
                <input type="text" name="name" id="name" placeholder="nama"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>
            <div class="mb-5">
                <label for="phone" class="mb-3 block text-base font-medium text-[#07074D]">
                    Nomor HP
                </label>
                <input type="text" name="phone" id="phone" placeholder="Masukan nomor HP"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>
            <div class="mb-5">
                <label for="email" class="mb-3 block text-base font-medium text-[#07074D]">
                    Email Address
                </label>
                <input type="email" name="email" id="email" placeholder="Enter your email"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>
            <div class="mb-5">
                <label for="jml_orang" class="mb-3 block text-base font-medium text-[#07074D]">
                    Jumlah orang
                </label>
                <input type="number" name="jml_orang" id="jml_orang" placeholder="Masukan Jumlah orang"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>
            <div class="-mx-3 flex flex-wrap">
                <div class="w-full px-3 sm:w-1/2">
                    <div class="mb-5">
                        <label for="date" class="mb-3 block text-base font-medium text-[#07074D]">
                            Tanggal
                        </label>
                        <input type="date" name="date" id="date"
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                </div>
                <div class="w-full px-3 sm:w-1/2">
                    <div class="mb-5">
                        <label for="hari" class="mb-3 block text-base font-medium text-[#07074D]">
                            Berapa Hari
                        </label>
                        <input type="num" name="hari" id="hari"
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                </div>
            </div>

            <div class="mb-5 pt-3">
                <label class="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                   Paket 
                </label>
                <div class="-mx-3 flex flex-wrap">
                    <div class="w-full ">
                        <div class="mb-5">
                            <select name="" id="" className='w-full  rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'>
                                <option value="">Paket 1</option>
                                <option value="">Paket 2</option>
                                <option value="">Paket 3</option>
                            </select>
                          
                        </div>
                    </div>
                   
                </div>
            </div>

            <div>
                <button
                    class="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                    Book Appointment
                </button>
            </div>
        </form>
    </div>
</div>
  )
}

export default FormPage