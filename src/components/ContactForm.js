import React from "react";
import { Col, Icon, Input, Form } from "antd";

// STYLES
import styles from "./ContactForm.module.less";

const ContactForm = ({ contact, updateContact, index }) => (
  <Form className={styles.ContactForm} layout="inline">
    <ContactFormItem
      label="First Name"
      fieldName="firstName"
      contact={contact}
      index={index}
    />
    <ContactFormItem
      label="Last Name"
      fieldName="lastName"
      contact={contact}
      index={index}
    />
    <ContactFormItem
      label="Job Title"
      fieldName="jobTitle"
      contact={contact}
      index={index}
    />
    <ContactFormItem
      label="Mobile Number"
      fieldName="mobileNumber"
      contact={contact}
      index={index}
    />
    <ContactFormItem
      label="Home Number"
      fieldName="homeNumber"
      contact={contact}
      index={index}
    />
    <ContactFormItem
      label="Work Number"
      fieldName="workNumber"
      contact={contact}
      index={index}
    />
    <ContactFormItem
      label="Email"
      fieldName="email"
      contact={contact}
      index={index}
    />
    <ContactFormItem
      label="Address"
      fieldName="address"
      contact={contact}
      index={index}
    />
  </Form>
);

const ContactFormItem = ({ contact, fieldName, label, index }) => {
  const inputRef = React.useRef();
  const [inputShown, setInputShown] = React.useState(false);

  const hideInput = () => setInputShown(false);
  const showInput = () => {
    setInputShown(true);
  };

  React.useEffect(() => {
    inputShown && inputRef.current.focus();
  }, [inputShown]);

  const fieldValue = contact[fieldName];
  const hasValue = fieldValue !== "";
  const displayValue = hasValue ? fieldValue : "Click to edit...";

  return (
    <Col span={12}>
      <Form.Item label={label}>
        {inputShown ? (
          <Input
            ref={inputRef}
            name={`${index}.${fieldName}`}
            value={fieldValue}
            onBlur={hideInput}
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
