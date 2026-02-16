import { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useGetAdmins } from "@/api/admins/useGetAdmins";
import { useCreateAdmin } from "@/api/admins/useCreateAdmin";
import { useEditAdmin } from "@/api/admins/useEditAdmin";
import { useChangePassword } from "@/api/admins/useChangePassword";
import { useRemoveAdmin } from "@/api/admins/useRemoveAdmin";
import { useToast } from "@/hooks/use-toast";
import { AddAdminModal } from "./ui/AddAdminModal";
import { EditAdminModal } from "./ui/EditAdminModal";
import { ChangePasswordModal } from "./ui/ChangePasswordModal";
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog";
import { FiEdit, FiTrash2, FiLock } from "react-icons/fi";
import type {
  NewAdmin,
  EditAdminReq,
  OneAdmin,
} from "@/interfaces/admins.interface";
import dayjs from "dayjs";

const ROLE_LABELS: Record<string, string> = {
  admin: "Администратор",
  moderator: "Модератор",
  operator: "Оператор",
  supportOperator: "Оператор поддержки",
};

const Admins = () => {
  const { data: admins, isLoading } = useGetAdmins();
  const createAdmin = useCreateAdmin();
  const editAdmin = useEditAdmin();
  const changePassword = useChangePassword();
  const removeAdmin = useRemoveAdmin();
  const { toast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState<NewAdmin>({
    login: "",
    password: "",
    roles: [],
  });

  // Edit modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<EditAdminReq>({
    id: "",
    login: "",
    roles: [],
  });

  // Change password modal state
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordAdmin, setPasswordAdmin] = useState<OneAdmin | null>(null);

  // Delete dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState<OneAdmin | null>(null);

  const rows = admins?.data?.admins || [];

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAdmin.mutateAsync(newAdmin);
      toast({
        title: "Успешно",
        description: "Сотрудник создан",
        variant: "success",
      });
      setIsModalOpen(false);
      setNewAdmin({ login: "", password: "", roles: [] });
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось создать сотрудника",
        variant: "destructive",
      });
    }
  };

  const handleEditClick = (admin: OneAdmin) => {
    setEditFormData({
      id: admin.id,
      login: admin.login,
      roles: [...admin.roles],
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await editAdmin.mutateAsync(editFormData);
      toast({
        title: "Успешно",
        description: "Данные сотрудника обновлены",
        variant: "success",
      });
      setIsEditModalOpen(false);
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить данные",
        variant: "destructive",
      });
    }
  };

  const handlePasswordClick = (admin: OneAdmin) => {
    setPasswordAdmin(admin);
    setIsPasswordModalOpen(true);
  };

  const handlePasswordSubmit = async (
    oldPassword: string,
    newPassword: string,
  ) => {
    if (!passwordAdmin) return;
    try {
      await changePassword.mutateAsync({
        id: passwordAdmin.id,
        oldPassword,
        newPassword,
      });
      toast({
        title: "Успешно",
        description: "Пароль изменён",
        variant: "success",
      });
      setIsPasswordModalOpen(false);
      setPasswordAdmin(null);
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось сменить пароль",
        variant: "destructive",
      });
    }
  };

  const handleDeleteClick = (admin: OneAdmin) => {
    setAdminToDelete(admin);
    setDeleteDialogOpen(true);
  };

  const handleConfirmedDelete = async () => {
    if (!adminToDelete) return;
    try {
      await removeAdmin.mutateAsync(adminToDelete.id);
      toast({
        title: "Успешно",
        description: "Сотрудник удалён",
        variant: "success",
      });
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить сотрудника",
        variant: "destructive",
      });
    }
    setDeleteDialogOpen(false);
    setAdminToDelete(null);
  };

  return (
    <div className="p-[35px] 2xl:p-[60px]">
      <div className="font-dm text-textSecondary mb-10 flex items-center justify-between">
        <div>
          <div className="text-[32px] font-bold">Сотрудники</div>
          <p className="text-textSecondary text-base">
            Управление сотрудниками
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 text-white text-[15px] font-dm rounded-xl cursor-pointer transition-all hover:opacity-90 active:scale-95"
          style={{ backgroundColor: "#88ba00" }}
        >
          Добавить сотрудника
        </button>
      </div>

      <div className="w-full border border-headerBorder rounded-2xl p-4">
        {isLoading ? (
          <div className="bg-white rounded-2xl px-9 py-16 border border-grayBorder text-center">
            <p className="font-dm text-textGray text-base">Загрузка...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-mainBg hover:bg-mainBg border-none">
                    <TableHead className="font-dm font-medium text-base text-primary">
                      Логин
                    </TableHead>
                    <TableHead className="font-dm font-medium text-base text-primary">
                      Роли
                    </TableHead>
                    <TableHead className="font-dm font-medium text-base text-primary">
                      Дата создания
                    </TableHead>
                    <TableHead className="font-dm font-medium text-base text-primary text-right">
                      Действия
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((admin) => (
                    <TableRow key={admin.id} className="hover:bg-mainBg/50">
                      <TableCell className="font-dm text-sm text-textSecondary">
                        {admin.login}
                      </TableCell>
                      <TableCell className="font-dm text-sm text-textSecondary">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {admin.roles.map((role) => (
                            <span
                              key={role}
                              className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full text-xs"
                            >
                              {ROLE_LABELS[role] || role}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="font-dm text-sm text-textSecondary">
                        {admin.created
                          ? dayjs(admin.created).format("DD.MM.YYYY")
                          : "-"}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditClick(admin)}
                            className="p-2 text-textSecondary hover:text-primary transition-colors cursor-pointer"
                            title="Редактировать"
                          >
                            <FiEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handlePasswordClick(admin)}
                            className="p-2 text-textSecondary hover:text-primary transition-colors cursor-pointer"
                            title="Сменить пароль"
                          >
                            <FiLock className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(admin)}
                            className="p-2 text-textSecondary hover:text-red-500 transition-colors cursor-pointer"
                            title="Удалить"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {rows.length === 0 && (
              <div className="bg-white rounded-2xl px-9 py-16 border border-grayBorder text-center">
                <p className="font-dm text-textGray text-base">
                  Нет сотрудников для отображения
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <AddAdminModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        formData={newAdmin}
        setFormData={setNewAdmin}
        onSubmit={handleCreate}
        isPending={createAdmin.isPending}
      />

      <EditAdminModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        formData={editFormData}
        setFormData={setEditFormData}
        onSubmit={handleEditSubmit}
        isPending={editAdmin.isPending}
      />

      <ChangePasswordModal
        open={isPasswordModalOpen}
        onOpenChange={setIsPasswordModalOpen}
        adminLogin={passwordAdmin?.login || ""}
        onSubmit={handlePasswordSubmit}
        isPending={changePassword.isPending}
      />

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmedDelete}
        itemName={adminToDelete?.login}
        itemType="сотрудника"
        isLoading={removeAdmin.isPending}
      />
    </div>
  );
};

export default Admins;
