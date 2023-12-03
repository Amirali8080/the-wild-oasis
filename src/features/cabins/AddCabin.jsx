import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
function AddCabin() {
  //instead of the previous code we use Compound Components to make our modal mor flexible
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );

  // const [isOpednModal, setIsOpednModal] = useState(false);
  // return (
  //   <div>
  //     <Button onClick={() => setIsOpednModal((show) => !show)}>
  //       Add new cabin
  //     </Button>
  //     {isOpednModal && (
  //       <Modal onClose={() => setIsOpednModal(false)}>
  //         <CreateCabinForm onCloseModal={() => setIsOpednModal(false)} />
  //       </Modal>
  //     )}
  //   </div>
  // );
}

export default AddCabin;
