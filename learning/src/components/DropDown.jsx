import { ChevronDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import './styles/DropDown.css'


export default function DropDown(props){
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef(null)

    //const options = [props.list1, props.list2]
    // DropDown Logic
    useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [])
    const handleSelect = () => {
    setOpen(false)
    console.log("close dropdown")
    }

    return(
    <div className="dropdown" ref={dropdownRef}>
      <button className="dropdown-btn" onClick={() => setOpen(!open)}>
        <span>Profile Action</span>

        {/* Rotating arrow */}
        <ChevronDown
          className={`dropdown-arrow ${open ? "open" : ""}`}
          size={18}
        />
      </button>

      {/* Dropdown menu */}
      {open && (
        <ul className="dropdown-menu">
            <li
              className="dropdown-item"
               onClick={() => {props.list1Function()
                              handleSelect()}}
            >
              {props.list1}
            </li>
             <li
              className="dropdown-item"
              onClick={() => {props.list2Function()  
                              handleSelect()}}
            >
              {props.list2}
            </li>
        </ul>
      )}
    </div>
    )
}