import React from "react";
import { Col, Icon, Input, Form } from "antd";
import debounce from "lodash/debounce";
import noop from "lodash/noop";

// STYLES
import styles from "./ContactForm.module.less";

const ContactForm = ({ contact, index, updateContact, saveContact = noop }) => {
  const _saveContact = React.useCallback(debounce(saveContact, 1000), []);

  return (
    <Form className={styles.contactForm} layout="inline">
      <ContactFormItem
        label="First Name"
        fieldName="firstName"
        contact={contact}
        index={index}
        updateContact={updateContact}
        saveContact={_saveContact}
      />
      <ContactFormItem
        label="Last Name"
        fieldName="lastName"
        contact={contact}
        index={index}
        updateContact={updateContact}
        saveContact={_saveContact}
      />
      <ContactFormItem
        label="Job Title"
        fieldName="jobTitle"
        contact={contact}
        index={index}
        updateContact={updateContact}
        saveContact={_saveContact}
      />
      <ContactFormItem
        label="Mobile Number"
        fieldName="mobileNumber"
        contact={contact}
        index={index}
        updateContact={updateContact}
        saveContact={_saveContact}
      />
      <ContactFormItem
        label="Home Number"
        fieldName="homeNumber"
        contact={contact}
        index={index}
        updateContact={updateContact}
        saveContact={_saveContact}
      />
      <ContactFormItem
        label="Work Number"
        fieldName="workNumber"
        contact={contact}
        index={index}
        updateContact={updateContact}
        saveContact={_saveContact}
      />
      <ContactFormItem
        label="Email"
        fieldName="email"
        contact={contact}
        index={index}
        updateContact={updateContact}
        saveContact={_saveContact}
      />
      <ContactFormItem
        label="Address"
        fieldName="address"
        contact={contact}
        index={index}
        updateContact={updateContact}
        saveContact={_saveContact}
      />
    </Form>
  );
};

const ContactFormItem = ({
  contact,
  fieldName,
  label,
  index = null,
  updateContact,
  saveContact
}) => {
  const inputRef = React.useRef();
  const [inputShown, setInputShown] = React.useState(false);

  const fieldValue = contact[fieldName];
  const hasValue = fieldValue !== "";
  const displayValue = hasValue ? fieldValue : "Click to edit...";
  const name = index !== null ? `${index}.${fieldName}` : fieldName;

  // EFFECTS
  React.useEffect(() => {
    // Trigger focus on the input when it's shown
    inputShown && inputRef.current.focus();
  }, [inputShown]);

  // HANDLERS
  const handleBlur = () => {
    setInputShown(false);
    saveContact(index);
  };

  const showInput = () => {
    setInputShown(true);
  };

  return (
    <Col span={12}>
      <Form.Item label={label}>
        {inputShown ? (
          <Input
            ref={inputRef}
            name={name}
            value={fieldValue}
            onChange={updateContact}
            onBlur={handleBlur}
          />
        ) : (
          <span
            tabIndex="0"
            onClick={showInput}
            onFocus={showInput}
            className={styles.displayValueWrapper}
          >
            <span className={hasValue ? "" : "noValue"}>{displayValue}</span>
            <Icon type="edit" />
          </span>
        )}
      </Form.Item>
    </Col>
  );
};

export default ContactForm;
