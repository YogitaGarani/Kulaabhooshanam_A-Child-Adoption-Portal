"use client"

// All necessary imports
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from "../../styles/forms.module.css";
import Collage from "./collage";

// Define the Register functional component and export
export default function Register() {
    // Initialize all refs and hooks
    const router = useRouter();
    const UloginID = useRef();
    const Usex = useRef();
    const Uage = useRef();
    const Upswd = useRef();
    const Umar = useRef();
    const Ubiok = useRef();
    const Uadk = useRef();
    const Uph = useRef();
    const Uname = useRef();
    const Uinc = useRef();
    const Ubank = useRef();
    const Uspname = useRef('null');
    const Uspaad = useRef('null');
    const Uspage = useRef(0);
    const Uaddress = useRef();
    const UFinst = useRef();
    const UCaste = useRef('null');
    const Umail = useRef();

    const AgencyID = useRef();
    const AgencyName = useRef();
    const Agencymail = useRef();
    const Aph = useRef();
    const Numsuccadd = useRef();
    const Agencykids = useRef();
    const AgencyLoc = useRef();
    const AgencyAddress = useRef();

    const [selectedRole, setSelectedRole] = useState();
    const [roleSelected, setRoleSelected] = useState(false);
    const [created, setCreated] = useState(false);
    const [user, setUser] = useState(false);
    const [error, setError] = useState(false);

    // Define function to handle the addition of data based on selected role
    async function HandleRegister () {   
        event.preventDefault(); 
    // Parent       
    if (selectedRole === 'parent') {
        try {
            const sex = Usex.current.value.trim();
            const age = Uage.current.value.trim();
            const pswd = Upswd.current.value.trim();
            const mar = Umar.current.value.trim();
            const fin = UFinst.current.value.trim();
            const caste = UCaste.current.value.trim() || null;
            const nad = Uadk.current.value.trim();
            const nbio = Ubiok.current.value.trim();
            const bank = Ubank.current.value.trim();
            const addr = Uaddress.current.value.trim();
            const spname = Uspname.current.value.trim() || null;
            const spaad = Uspaad.current.value.trim() || null;
            const spage = Uspage.current.value.trim() || 0;
            const ph = Uph.current.value.trim();
            const name = Uname.current.value.trim();
            const inc = Uinc.current.value.trim();
            const pid = UloginID.current.value.trim();
            const mail = Umail.current.value.trim();

            // Prepare data for POST request
            const postData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sex: sex,
                age: age,
                pid: pid,
                pswd: pswd,
                inc: inc,
                name: name,
                ph: ph,
                spaad: spaad,
                spage: spage,
                spn: spname,
                addr: addr,
                bank: bank,
                nbio: nbio,
                nad: nad,
                caste: caste,
                fin: fin,
                mar: mar,
                mail: mail

            })
            };

            // Make API request to register
            const res = await fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/register`,
            postData
            );

            // Handle response
            if (!res.ok) {
                setError(true);
                throw new Error(`API request failed with status ${res.status}`);
            }
            const response = await res.json();
            console.log("POST --- API Response:", response);
            if (response.message === "exists") {
                setUser(true);
                console.log('Please login')
                return;
            }
            if (response.message === "LOGIN VALID") {
                localStorage.setItem('authenticated', 'true');
                localStorage.setItem('loginresponse', JSON.stringify(response));
                localStorage.setItem('isagency', 'false');
                setCreated(true);
                router.push(`/`);
            }
        } catch (error) {
        console.error("POST -- Error fetching data:", error);
        }
    }

    // Agency
    else if (selectedRole === 'agency') {
        try {
            const aid = AgencyID.current.value.trim();
            const name = AgencyName.current.value.trim();
            const mail = Agencymail.current.value.trim();
            const ph = Aph.current.value.trim();
            const loc = AgencyLoc.current.value.trim();
            const nsa = Numsuccadd.current.value.trim();
            const aks = Agencykids.current.value.trim();
            const addr = AgencyAddress.current.value.trim();

            // Prepare data for POST request
            const postData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                aid: aid,
                name: name,
                mail: mail,
                ph: ph, 
                loc: loc, 
                nsa: nsa,
                aks: aks,
                addr: addr


            })
            };            
            
            // Make API request to agency register
            const res = await fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/agencyregister`,
            postData
            );

            // Handle response
            if (!res.ok) {
                setError(true);
                throw new Error(`API request failed with status ${res.status}`);
            }

            const response = await res.json();
            console.log("POST --- API Response:", response);
            if (response.message === "exists") {
                setUser(true);
                console.log('Please login')
                return;
            }
            if (response.message === "LOGIN VALID") {
                localStorage.setItem('authenticated', 'true');
                localStorage.setItem('isagency', 'true');
                localStorage.setItem('agencyid', response.name);
                localStorage.setItem('loginresponse', JSON.stringify(response));
                setCreated(true);
                router.push(`/`);
            }
            }catch (error) {
                console.error("POST -- Error fetching data:", error);
            }

        }
            
    };

    // Function to handle role selection
    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        setRoleSelected(true);
      };
    
    // Render the component   
    return (
        <>
        <main className = {styles.mainBox}>
            <form className = {styles.formElement} onSubmit = {HandleRegister}>
                <div className = {styles.formContainer}>
                    <div>
                        <h1 className = {styles.h1}>Kulaabhooshanam</h1>
                        <p className = {styles.pTag}>Building relationships, one family at a time.</p>
                    </div>
                    <div className={styles.inputsContainer}>
                        <div>
                        {/* Select Role input */}
                        <div className={styles.inputDivs}>
                            <div><label htmlFor="role">Select your role:</label>
                            <p></p>
                            <select
                                className = {styles.inputBox}
                                name="role"
                                value = {selectedRole}
                                onChange = {(e) => handleRoleSelect(e.target.value)}
                                >
                                <option value = 'select'>Select</option>
                                <option value = "parent">Parent</option>
                                <option value = "agency">Agency</option>
                            </select></div>
                            {/* COnditional render */}
                                {roleSelected && (
                                    <div>
                                        {selectedRole === 'parent' ? (
                                   <>
                                   {/* Parent registration form fields */}
                                     <div className = {styles.inputDivs}>
                                         <label htmlFor = "p_id">Enter your ID(Aadhar Number)</label>
                                         <p></p>
                                         <input 
                                         className = {styles.inputBox}
                                         type = "text"
                                         ref = {UloginID}
                                         placeholder = "4222 2224 4222"
                                         required
                                        //  pattern = '^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$'
                                         />
                                     </div>
                                     <div className = {styles.inputDivs}>
                                         <label htmlFor = "Name">Name of the user</label>
                                         <p></p>
                                         <input 
                                         className = {styles.inputBox}
                                         type = "text"
                                         ref = {Uname}
                                         placeholder = "Name" 
                                         required
                                         />
                                     </div>
                                     <div className = {styles.inputDivs}>
                                         <label htmlFor = "Sex">Sex of the user</label>
                                         <p></p>
                                         <input 
                                         className = {styles.inputBox}
                                         type = "text"
                                         ref = {Usex}
                                         placeholder = "M / F / Other" 
                                         required
                                         />
                                     </div>
                                     <div className = {styles.inputDivs}>
                                         <label htmlFor = "age">Age of the user</label>
                                         <p></p>
                                         <input
                                         className = {styles.inputBox}
                                         type="number"
                                         ref = {Uage}
                                         placeholder = "Enter age of the user"
                                         required
                                         />
                                     </div>
                                     <div className = {styles.inputDivs}>
                                         <label htmlFor = "Marstat">What is your marital status</label>
                                         <p></p>
                                         <input 
                                         className = {styles.inputBox}
                                         type = "text"
                                         ref = {Umar}
                                         placeholder = "Married / Single / Divorced / Widowed" 
                                         required
                                         />
                                     </div>

                                 <div className = {styles.inputDivs}>
                                         <label htmlFor = "Income">Income of the user</label>
                                         <p></p>
                                         <input 
                                         className = {styles.inputBox}
                                         type = "number"
                                         ref = {Uinc}
                                         placeholder = "Income" 
                                         required
                                         />
                                     </div>
                                     <div className = {styles.inputDivs}>
                                         <label htmlFor = "fin">financial_status of the user</label>
                                         <p></p>
                                         <input
                                         className = {styles.inputBox}
                                         type="text"
                                         ref = {UFinst}
                                         placeholder = "Enter finstat of the user"
                                         required
                                         />
                                     </div>
                                 <div className = {styles.inputDivs}>
                                     <label htmlFor = "Caste">Caste of the user</label>
                                     <p></p>
                                     <input 
                                     className = {styles.inputBox}
                                     type = "text"
                                     ref = {UCaste}
                                     placeholder = "Caste" 
                                     />
                                 </div>
                                 <div className = {styles.inputDivs}>
                                     <label htmlFor = "Bank">Bank of the user</label>
                                     <p></p>
                                     <input 
                                     className = {styles.inputBox}
                                     type = "text"
                                     ref = {Ubank}
                                     placeholder = "Bank" 
                                     required
                                     />
                                 </div>
                                 <div className = {styles.inputDivs}>
                                     <label htmlFor = "Mail">Mail of the user</label>
                                     <p></p>
                                     <input 
                                     className = {styles.inputBox}
                                     type = "text"
                                     ref = {Umail}
                                     placeholder = "mail@domain.com" 
                                     pattern = '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$'
                                     required
                                     />
                                 </div>
                                 <div className = {styles.inputDivs}>
                                     <label htmlFor = "Ph">Phone number of the user</label>
                                     <p></p>
                                     <input 
                                     className = {styles.inputBox}
                                     type = "text"
                                     ref = {Uph}
                                     placeholder = "Phone" 
                                     required
                                     />                    
                                 </div>
                                 <div className = {styles.inputDivs}>
                                     <label htmlFor = "Address">Address of the user</label>
                                     <p></p>
                                     <input 
                                     className = {styles.inputBox}
                                     type = "text"
                                     ref = {Uaddress}
                                     placeholder = "Address" 
                                     required
                                     />
                                 </div>
                                 <div className = {styles.inputDivs}>
                                     <label htmlFor = "nbio">Number of biological children</label>
                                     <p></p>
                                     <input 
                                     className = {styles.inputBox}
                                     type = "number"
                                     ref = {Ubiok}
                                     placeholder = "Number of biological children" 
                                     required
                                     />
                                 </div>
                                 <div className = {styles.inputDivs}>
                                     <label htmlFor = "nad">Number of adopted children</label>
                                     <p></p>
                                     <input 
                                     className = {styles.inputBox}
                                     type = "number"
                                     ref = {Uadk}
                                     placeholder = "Number of adopted children" 
                                     required
                                     />
                                 </div>
                                 <div className = {styles.inputDivs}>
                                     <label htmlFor = "spname">Name of spouse</label>
                                     <p></p>
                                     <input 
                                     className = {styles.inputBox}
                                     type = "text"
                                     ref = {Uspname}
                                     placeholder = "Name of spouse" 
                                     />
                                 </div>
                                 <div className = {styles.inputDivs}>
                                     <label htmlFor = "spaadhar">Aadhar of spouse</label>
                                     <p></p>
                                     <input 
                                     className = {styles.inputBox}
                                     type = "text"
                                     ref = {Uspaad}
                                     placeholder = "Aadhar of spouse"
                                    //  pattern = '[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}' 
                                     />
                                 </div>
                                 <div className = {styles.inputDivs}>
                                     <label htmlFor = "spage">Age of spouse</label>
                                     <p></p>
                                     <input 
                                     className = {styles.inputBox}
                                     type = "number"
                                     ref = {Uspage}
                                     placeholder = "Age of spouse" 
                                     />
                                 </div>
                                 <div className = {styles.inputDivs}>
                                     <label htmlFor = "Password">Password</label>
                                     <p></p>
                                     <input 
                                     className = {styles.inputBox}
                                     type = "text"
                                     ref = {Upswd}
                                     placeholder = "XXXXXXXX"
                                     maxLength = {8}                       
                                     />
                                 </div>
                                 </>
                    ) : (            <>
                        {/* Agency registration form fields */}
                          <div className = {styles.inputDivs}>
                              <label htmlFor = "aid">Registered Agency ID</label>
                              <p></p>
                              <input 
                              className = {styles.inputBox}
                              type = "number"
                              ref = {AgencyID}
                              placeholder = "Registered ID"
                              required
                              />
                          </div>
                          <div className = {styles.inputDivs}>
                              <label htmlFor = "AName">Name of the Agency</label>
                              <p></p>
                              <input 
                              className = {styles.inputBox}
                              type = "text"
                              ref = {AgencyName}
                              placeholder = "Name" 
                              required
                              />
                          </div>
           
                          <div className = {styles.inputDivs}>
                              <label htmlFor = "age">Location of the agency</label>
                              <p></p>
                              <input
                              className = {styles.inputBox}
                              type="text"
                              ref = {AgencyLoc}
                              placeholder = "City"
                              required
                              />
                          </div>
          
                      <div className = {styles.inputDivs}>
                              <label htmlFor = "Income">Agency housing address</label>
                              <p></p>
                              <input 
                              className = {styles.inputBox}
                              type = "text"
                              ref = {AgencyAddress}
                              placeholder = "Address" 
                              required
                              />
                          </div>
                      <div className = {styles.inputDivs}>
                          <label htmlFor = "Mail">Official mailing address</label>
                          <p></p>
                          <input 
                          className = {styles.inputBox}
                          type = "text"
                          ref = {Agencymail}
                          placeholder = "mail@domain.com" 
                          pattern = '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$'
                          required
                          />
                      </div>
                      <div className = {styles.inputDivs}>
                          <label htmlFor = "Ph">Official phone number</label>
                          <p></p>
                          <input 
                          className = {styles.inputBox}
                          type = "text"
                          ref = {Aph}
                          placeholder = "Phone" 
                          required
                          />                    
                      </div>
             
                      <div className = {styles.inputDivs}>
                          <label htmlFor = "nbio">Number of children in house</label>
                          <p></p>
                          <input 
                          className = {styles.inputBox}
                          type = "number"
                          ref = {Agencykids}
                          placeholder = "Number of in house children" 
                          required
                          />
                      </div>
                      <div className = {styles.inputDivs}>
                          <label htmlFor = "nad">Number of Successfuly adopted children</label>
                          <p></p>
                          <input 
                          className = {styles.inputBox}
                          type = "number"
                          ref = {Numsuccadd}
                          placeholder = "Number of successfully adopted children" 
                          required
                          />
                      </div>
                      </>
              )}<></>
              <div className = {styles.saveButton}>
                    <input
                    value = "Register"
                    type = "submit"
                  />
                </div>
            </div>
            )}
            </div>
            {/* Display success and error messages */}
            {created && <div className={styles.successMsg}>Success!</div>}
            {user && <div className = {styles.errorMsg}>User already exists. Please login</div>}
            {error && <div className={styles.errorMsg}>Error: Login or Use a different ID</div>}
            </div>
            </div>
            </div>
            <Collage />

        </form>
    </main>  
</>
);
}   