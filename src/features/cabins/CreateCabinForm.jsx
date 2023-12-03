/* eslint-disable react/prop-types */
import styled from "styled-components";
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;
const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;
function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  // custom hooks for creatin and editing cabins, in each of them we use api cabins
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isLoading = isEditing || isCreating;

  // when the form is for editing we recieve an object, if is for creating, then it's just an emty object for preventing bugs ;)
  const { id: editId, ...editValue } = cabinToEdit;
  // checck for what kind of form it is
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValue : {},
  });
  const { errors } = formState;

  // if everything is correct in the form, this function will happend
  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    // we can use ONSUCCESS HANDLER FUNCTION where the mutation actually happend
    if (isEditSession)
      editCabin(
        { cabin: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }
  // if something goes wrong, this will be the one
  function onError(errors) {
    // console.log(errors);
  }
  return (
    <Form
      type={onCloseModal ? "modal" : "regular"}
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      {/*IF THERE WAS AN ERROR WE COULD RUN THE SECOND FUNCTION*/}
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          disabled={isLoading}
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
        {errors?.name?.message && <Error>{errors?.name?.message}</Error>}
      </FormRow>
      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          disabled={isLoading}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
        />
        {errors?.maxCapacity?.message && (
          <Error>{errors?.maxCapacity?.message}</Error>
        )}
      </FormRow>
      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          disabled={isLoading}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 1, message: "Regular price should be at least 1" },
          })}
        />
        {errors?.regularPrice?.message && (
          <Error>{errors?.regularPrice?.message}</Error>
        )}
      </FormRow>
      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          disabled={isLoading}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= Number(getValues().regularPrice) ||
              "Discount should be less than regular price",
          })}
        />
        {errors?.discount?.message && (
          <Error>{errors?.discount?.message}</Error>
        )}
      </FormRow>
      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          disabled={isLoading}
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
        {errors?.description?.message && (
          <Error>{errors?.description?.message}</Error>
        )}
      </FormRow>
      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          disabled={isLoading}
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>
      <ButtonRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </ButtonRow>
    </Form>
  );
}

export default CreateCabinForm;
