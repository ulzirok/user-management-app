import { ButtonGroup, Button } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import { LockOpen, Trash2, UserMinus } from "lucide-react"; 

export default function Toolbar({ onAction, hasSelection, selectedUsers }) {
  const isOneUnconfirmed = selectedUsers.length === 1 && selectedUsers[0].status === 'unconfirmed';
  
  return (
    <ButtonGroup className="mb-3">
      <Stack direction="horizontal" gap={1}>
        <Button
          variant="primary"
          disabled={!hasSelection}
          onClick={() => onAction("block", "blocked")}
        >
          Block
        </Button>
        <Button
          variant="success"
          disabled={!hasSelection}
          onClick={() => onAction("unblock", "active")}
          title="Unblock"
        >
          <LockOpen size={18} />
        </Button>
        <Button
          variant="danger"
          disabled={!hasSelection}
          onClick={() => onAction("delete")}
          title="Delete"
        >
          <Trash2 size={18} />
        </Button>
        <Button
          variant="warning"
          disabled={!isOneUnconfirmed}
          onClick={() => onAction("delete")}
          title="Delete"
        >
          <UserMinus size={18} />
        </Button>
      </Stack>
    </ButtonGroup>
  );
}
