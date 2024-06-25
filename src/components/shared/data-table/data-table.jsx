"use client";
import DeleteModal from "@/app/(public)/user/settings/DeleteModal";
import ConfirmationDialog from "@/components/modals/ConfirmationDialog";
import Modal from "@/components/modals/Modal";
import useMutation from "@/hooks/useMutation";
import { customRevalidateTag } from "@/lib/revalidateTag";
import { useUpdateOrderStatusMutation } from "@/services/redux/api/order-api";
import {
  useDeleteProductMutation,
  useUpdateProductStatusMutation,
} from "@/services/redux/api/product-api";
import { useUpdateUserStatusMutation } from "@/services/redux/api/user-api";

import { cn } from "@/utils/cn";
import { CircleCheckBig, Delete, Edit, Trash, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const OrderStatusActionOptions = [
  { value: "PENDING", label: "Pending" },
  { value: "SHIPPED", label: "Shipped" },
  { value: "DELIVERED", label: "Delivered" },
  { value: "CANCELLED", label: "Cancelled" },
  { value: "REFUNDED", label: "Refunded" },
];

const UserStatusActionOptions = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
  { value: "DELETED", label: "Deleted" },
  { value: "Suspended", label: "Suspended" },
];

const ProductStatusActionOptions = [
  { value: "true", label: "Visible" },
  { value: "false", label: "Hidden" },
];

const colors = {
  DELIVERED: "bg-green-500 text-white",
  PENDING: "bg-yellow-500",
  CANCELLED: "bg-red-500 text-white",
  SHIPPED: "bg-blue-500 text-white",
  REFUNDED: "text-black border-2",
  true: "bg-success text-white",
};

const DataTable = ({ columns, data }) => {
  // const [isShowing, toggleModal] = useState(false);
  // const [isConfirmed, setIsConfirmed] = useState(false);

  return (
    <>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700 border">
        <TableHead columns={columns} />
        <TableBody data={data} columns={columns} />
      </table>
      {/* <Modal title={"Confirm"} isShowing={isShowing}>
        <ConfirmationDialog
          toggleModal={toggleModal}
          title={"Are you sure?"}
          buttonLabel={"Delete"}
          buttonVariant={"destructive"}
          setIsConfirmed={setIsConfirmed}
        />
      </Modal> */}
    </>
  );
};

const TableHead = ({ columns }) => {
  return (
    <thead className="border">
      <tr>
        {columns.map((v, k) => {
          return (
            <th
              scope="col"
              className="px-6 py-4 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
              key={k}
            >
              {v.name}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

const TableBody = ({ data, columns }) => {
  return (
    <tbody>
      {data ? (
        data.map((v, k) => {
          return <TableRow key={k} item={v} columns={columns} />;
        })
      ) : (
        <tr> </tr>
      )}
    </tbody>
  );
};

const TableRow = ({ item, columns }) => {
  const pathname = usePathname();

  return (
    <tr className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-neutral-800 dark:even:bg-neutral-700 dark:hover:bg-neutral-700">
      {columns.map((v, k) => {
        const { uid } = v;
        const value = item[uid];
        switch (uid) {
          case "images":
            return (
              item.mainImage && (
                <td
                  key={uid}
                  className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200"
                >
                  <Image
                    height={200}
                    width={200}
                    src={item.mainImage.url || "/product-placeholder.png"}
                    alt={item.name}
                    className="size-20"
                  />
                </td>
              )
            );

          case "isPaymentDone":
            return (
              <td
                key={uid}
                className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200"
              >
                {!value ? "Payment Pending" : "Done"}
              </td>
            );
          case "products":
            return (
              <td key={uid} className="flex flex-col items-start gap-2 py-2">
                {item.items.products.map((product) => (
                  <p key={product.sku}>
                    {product.name} - {product.sku}
                  </p>
                ))}
              </td>
            );

          case "status":
            return (
              <StatusAction
                key={uid}
                value={value}
                id={item._id}
                options={OrderStatusActionOptions}
                type={"order"}
              />
            );
          case "userStatus":
            return (
              <StatusAction
                key={uid}
                value={value}
                id={item._id}
                options={UserStatusActionOptions}
                type={"user"}
              />
            );
          case "isVisible":
            return (
              <StatusAction
                key={uid}
                value={value}
                id={item.sku}
                options={ProductStatusActionOptions}
                type={"product"}
              />
            );

          case "actions":
            return (
              <RowActions
                key={uid}
                uid={uid}
                sku={item.sku}
                pathname={pathname}
              />
            );

          default:
            return (
              <td
                key={uid}
                className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200"
              >
                {value}
              </td>
            );
        }
      })}
    </tr>
  );
};

const VisibleStatusAction = ({ uid, value, sku, pathname }) => {
  const handleChange = async (e) => {
    await fetch(
      process.env.NEXT_PUBLIC_API + "products/product/update-status/" + sku,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: e.target.value }),
      }
    );
    customRevalidateTag(pathname);
  };
  return (
    <td
      key={uid}
      className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200"
    >
      <div className="flex gap-1 items-center">
        {value ? (
          <CircleCheckBig size={16} stroke="green" />
        ) : (
          <X size={16} stroke="red" />
        )}
        <select
          defaultValue={value ? "Visible" : "Hidden"}
          className={cn("p-2")}
          onChange={(e) => handleChange(e)}
          name="value"
        >
          <option className="bg-white text-black" value="Visible">
            Visible
          </option>
          <option className="bg-white text-black" value="Hidden">
            Hidden
          </option>
        </select>
      </div>
    </td>
  );
};

const StatusAction = ({ uid, value, id, options, type }) => {
  const [selectedValue, setSelectedValue] = useState(value);
  const useMutate = useMutation();
  const [mutateOrderStatus] = useUpdateOrderStatusMutation();
  const [mutateUserStatus] = useUpdateUserStatusMutation();
  const [mutateProductStatus] = useUpdateProductStatusMutation();

  const handleChange = async (e) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    const data = { status: newValue };
    switch (type) {
      case "order":
        useMutate({
          fn: mutateOrderStatus,
          data,
          endpoint: id,
          message: "Order Updated Successfully",
        });
        break;
      case "user":
        useMutate({
          fn: mutateUserStatus,
          data,
          endpoint: id,
          message: "User Updated Successfully",
        });
        break;
      case "product":
        useMutate({
          fn: mutateProductStatus,
          data,
          endpoint: id,
          message: "Product Updated Successfully",
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);
  return (
    <td
      key={uid}
      className={cn(
        "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200"
      )}
    >
      <select
        value={selectedValue}
        className={cn("p-2 border-2", colors[selectedValue])}
        onChange={(e) => handleChange(e)}
        name="value"
      >
        {options.map((v, k) => (
          <option key={k} value={v.value} className={cn("text-black bg-white")}>
            {v.label}
          </option>
        ))}
      </select>
    </td>
  );
};

export default StatusAction;

const RowActions = ({ uid, sku, pathname }) => {
  const [isModalShowing, setIsModalShowing] = useState(false);
  const useMutate = useMutation();
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const handleConfirm = async () => {
    const data = await useMutate({
      fn: deleteProduct,
      endpoint: sku,
      message: "Deleted Successfully",
    });

    if (data.statusCode) {
      customRevalidateTag("products");
      setIsModalShowing(false);
    }
  };

  return (
    <td
      key={uid}
      className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200"
    >
      <div className="flex size-full items-center gap-4">
        <Link
          href={{
            pathname: `${pathname}/${sku}`,
          }}
        >
          <Edit className="text-success" />
        </Link>
        <Trash
          className="text-delete cursor-pointer"
          onClick={() => setIsModalShowing(true)}
        />
      </div>
      {/* <Modal
        isShowing={toggleModal}
        toggleModal={setToggleModal}
        title={"Confirm Deletion"}
      >
        <ConfirmationDialog
          buttonProps={{ variant: "delete", buttonType: "outline" }}
          buttonLabel="Delete"
          toggleModal={setToggleModal}
          title={`Are you sure you want to delete ${sku}? this action can't be undone.`}
          setIsConfirmed={setIsConfirmed}
        />
      </Modal> */}

      <Modal
        isShowing={isModalShowing}
        confirmLabel={"Delete"}
        buttonProps={{
          variant: "delete",
          buttonType: "outline",
          isLoading: isLoading,
          disabled: isLoading,
        }}
        hide={() => setIsModalShowing(false)}
        title="Example Modal"
        onConfirm={handleConfirm}
      >
        <p>
          Are you sure to delete <b>{sku}</b>
        </p>
        <p>This action can't be undone.</p>
      </Modal>
    </td>
  );
};

export { DataTable };
