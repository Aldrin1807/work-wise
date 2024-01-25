import React, { useEffect, useState } from 'react';
import { Modal, Button, Form} from 'react-bootstrap';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { ActionMeta } from 'react-select';
import OptionTypeBase from 'react-select';
import { BsX } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { fetchUser, saveAdditionalData } from '../../api/user-api';
import { v4 as uuidv4 } from 'uuid';


interface UserProfileModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  changed: boolean;
  setChanged: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Experience {
  id:string;
  userId:string;
  companyName: string;
  position:string;
  dateFrom: string;
  dateTo: string;
  description: string;
}

const ExperienceModal: React.FC<{ show: boolean, onHide: () => void, onSave: (experience: Experience) => void }> = ({ show, onHide, onSave }) => {
  const user = useSelector((state: any) => state.user);
  
  const initialExperienceState: Experience = {
        id: uuidv4(),
        userId: user.userId,
        companyName: '',
        dateFrom: '',
        dateTo: '',
        position: '',
        description: '',
};

  
    const [experience, setExperience] = useState<Experience>(initialExperienceState);
    const [validationError, setValidationError] = useState<string>('');
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { id, value } = e.target;
      setExperience((prevExperience) => ({
        ...prevExperience,
        [id]: value
      }));
    };
  
    const handleSave = () => {
      if (!experience.companyName || !experience.dateFrom || !experience.dateTo || !experience.description) {
        setValidationError('Please fill in all required fields.');
        return;
      }
  
      setValidationError('');
      onSave(experience);
      resetExperience(); // Reset experience data
      onHide();
    };
  
    const resetExperience = () => {
      setExperience(initialExperienceState);
      setValidationError('');
    };
  
    const handleHide = () => {
      resetExperience(); // Reset experience data when modal is hidden
      onHide();
    };
  
    return (
      <Modal show={show} onHide={handleHide} backdrop="static" keyboard={false}>
        <Modal.Header closeButton={false} className="custom-modal-header">
        <Modal.Title>Add Experience</Modal.Title>
        <BsX className="custom-close-button" style={{ cursor: 'pointer' }} onClick={handleHide} />
      </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="companyName" className='mb-3'>
              <Form.Label>Company Name:*</Form.Label>
              <Form.Control type="text" value={experience.companyName} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="position" className='mb-3'>
              <Form.Label>Position:*</Form.Label>
              <Form.Control type="text" value={experience.position} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="dateFrom" className='mb-3'>
              <Form.Label>From Date:*</Form.Label>
              <Form.Control type="date" value={experience.dateFrom} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="dateTo" className='mb-3'>
              <Form.Label>To Date:*</Form.Label>
              <Form.Control type="date" value={experience.dateTo} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="description" className='mb-3'>
              <Form.Label>Description:*</Form.Label>
              <Form.Control as="textarea" rows={3} value={experience.description} onChange={handleChange} />
            </Form.Group>
  
            {validationError && <p className="text-danger">{validationError}</p>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHide}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

const UserProfileModal: React.FC<UserProfileModalProps> = (props) => {

  const user = useSelector((state: any) => state.user);

  const [userData, setUserData] = useState({
    userId:user.userId,
    introduction: '',
    skills: '',
    experiences: [] as Experience[],
  });


  useEffect(() => {
    const response = async () => {
      const data = await fetchUser(user.token ,user.userId);
      setUserData({
        userId:user.userId,
        introduction: data.introduction,
        skills: data.skills,
        experiences: data.experiences
      });
      setSelectedSkills(data.skills.split(',').map((skill: string) => ({ value: skill, label: skill })));
      
    }
    response();
  }, [props.showModal]);


  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showExperienceModal, setShowExperienceModal] = useState(false);

  const loadOptions = async (inputValue: string) => {
    try {
      const apiKey = "jsFS3p4blUMW5VutIIuiMoR4FRqh1PGq";
      const response = await axios.get(`https://api.apilayer.com/skills?q=${inputValue}`, {
        headers: { 'apiKey': apiKey }
      });
  
      const skills = response.data.map((skill: any) => ({ value: skill, label: skill }));
      return skills;
    } catch (error) {
      console.error('Error fetching skills:', error);
      return [];
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [id]: value
    }));
  };

  const handleExperienceSave = (experience: Experience) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      experiences: [...prevUserData.experiences, experience],
    }));
  };

  const removeExperience = (index: number) => {
    setUserData((prevUserData) => {
      const newExperiences = [...prevUserData.experiences];
      newExperiences.splice(index, 1);
      return { ...prevUserData, experiences: newExperiences };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(userData.experiences);
    if (userData.introduction.length < 10) {
        setValidationError('Please fill in all required fields.')
        return;
    }
    const response = await saveAdditionalData(user.token, userData);
    if (response) {
        props.setShowModal(false);
        props.setChanged(!props.changed);
    }

    console.log(userData);
  };


const OnSelectedChange = (selectedOptions: any) => {
    setSelectedSkills(selectedOptions as any);
  
    const skillsString = (selectedOptions as any[]).map((skill: any) => skill.value).join(', ');
    setUserData({
      ...userData,
      skills: skillsString,
    });
};

const handleToggleModal = () => {
    setValidationError('');
    setUserData({
        userId:user.userId,
        introduction: '',
        skills: '',
        experiences: []
    })
    props.setShowModal(!props.showModal);
}
const [validationError, setValidationError] = useState<string>('');

  return (
    <>
    <Modal
        show={props.showModal}
        onHide={handleToggleModal}
        dialogClassName="modal-lg" // Use Bootstrap class for large size
        backdrop="static" keyboard={false}
        >
        <Modal.Header closeButton={false} className="custom-modal-header">
        <Modal.Title>Additional information</Modal.Title>
        <BsX className="custom-close-button" style={{ cursor: 'pointer' }} onClick={handleToggleModal} />
      </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="introduction" className='mb-3'>
              <Form.Label>Introduction:*</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={userData.introduction}
                placeholder='Please introduce yourself minimum 10 characters.'
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="skills" className='mb-3'>
              <Form.Label>Skills:</Form.Label>
              <AsyncSelect
                isMulti
                name="skills"
                placeholder="Search for skills..."
                value={selectedSkills}
                onChange={OnSelectedChange}
                loadOptions={loadOptions}
              />
            </Form.Group>
            <Form.Group controlId="experience" className='mb-3'>
                <div className="d-flex justify-content-between align-items-center">
                    <Form.Label className="mb-0">Experiences:</Form.Label>
                    <FaPlus onClick={() => setShowExperienceModal(true)}/>
                </div>
                <div className="experiences-container mb-3">
                    {userData.experiences.map((experience, index) => (
                    <div key={index} className="experience-item d-flex flex-column p-3 border">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5 className="mb-0">{experience.companyName} : <span className='h6'>{experience.dateFrom} to {experience.dateTo}</span></h5>
                        <FaTimes className="remove-experience text-danger" onClick={() => removeExperience(index)} />
                        </div>
                        <h6 className="mb-0">{experience.position}</h6>
                        <p className="mb-0">{experience.description}</p>
                    </div>
                    ))}
                </div>
            </Form.Group>
            {validationError && <p className="text-danger">{validationError}</p>}

            <Button variant="primary" type="submit" className="float-end">
            Save
            </Button>

          </Form>
        </Modal.Body>
      </Modal>

      <ExperienceModal
        show={showExperienceModal}
        onHide={() => setShowExperienceModal(false)}
        onSave={handleExperienceSave}
      />
    </>
  );
};

export default UserProfileModal;
