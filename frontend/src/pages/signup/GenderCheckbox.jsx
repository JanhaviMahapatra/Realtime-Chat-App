import "../../style/GenderCheckbox.css";
import { FiUser } from "react-icons/fi";
import { IoFemaleOutline, IoMaleOutline } from "react-icons/io5";

const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
	return (
		<div className="gender-selector">

			<label
				className={`gender-card ${
					selectedGender === "male" ? "active" : ""
				}`}
			>
				<input
					type="radio"
					name="gender"
					value="male"
					checked={selectedGender === "male"}
					onChange={() => onCheckboxChange("male")}
				/>

				<div className="gender-icon">
					<IoMaleOutline />
				</div>

				<div className="gender-info">
					<h4>Male</h4>
					<p>He / Him</p>
				</div>
			</label>

			<label
				className={`gender-card ${
					selectedGender === "female" ? "active" : ""
				}`}
			>
				<input
					type="radio"
					name="gender"
					value="female"
					checked={selectedGender === "female"}
					onChange={() => onCheckboxChange("female")}
				/>

				<div className="gender-icon">
					<IoFemaleOutline />
				</div>

				<div className="gender-info">
					<h4>Female</h4>
					<p>She / Her</p>
				</div>
			</label>

		</div>
	);
};

export default GenderCheckbox;