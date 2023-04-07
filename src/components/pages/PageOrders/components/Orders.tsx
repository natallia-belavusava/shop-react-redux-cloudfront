import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {
  useDeleteOrder,
  useInvalidateOrders,
  useOrders,
} from "~/queries/orders";

export default function Orders() {
  const { data } = useOrders();
  const invalidateOrders = useInvalidateOrders();
  const { mutate: deleteOrder } = useDeleteOrder();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Delivery</TableCell>
            <TableCell align="right">Payment Type</TableCell>
            <TableCell align="right">Comments</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((order) => (
            <TableRow key={order.id}>
              <TableCell component="th" scope="row">
                {order.id}
              </TableCell>
              <TableCell align="right">{order.status}</TableCell>
              <TableCell align="right">{order.total}</TableCell>
              <TableCell align="right">{order.delivery.type}</TableCell>
              <TableCell align="right">{order.payment.type}</TableCell>
              <TableCell align="right">{order.comments}</TableCell>
              <TableCell align="right">
                <Button
                  size="small"
                  color="primary"
                  component={Link}
                  to={`${order.id}`}
                >
                  Manage
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() =>
                    order?.id &&
                    deleteOrder(order.id, { onSuccess: invalidateOrders })
                  }
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
