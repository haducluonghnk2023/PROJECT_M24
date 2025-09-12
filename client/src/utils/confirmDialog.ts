import Swal from 'sweetalert2';

export interface ConfirmOptions {
  title?: string;
  text?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  icon?: 'warning' | 'error' | 'success' | 'info' | 'question';
  showCancelButton?: boolean;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
}

export const confirmDialog = async (options: ConfirmOptions = {}): Promise<boolean> => {
  const {
    title = 'Xác nhận',
    text = 'Bạn có chắc chắn muốn thực hiện hành động này?',
    confirmButtonText = 'Xác nhận',
    cancelButtonText = 'Hủy',
    icon = 'question',
    showCancelButton = true,
    confirmButtonColor = '#3b82f6',
    cancelButtonColor = '#ef4444'
  } = options;

  const result = await Swal.fire({
    title,
    text,
    icon,
    showCancelButton,
    confirmButtonText,
    cancelButtonText,
    confirmButtonColor,
    cancelButtonColor,
    reverseButtons: true,
    focusCancel: false,
    customClass: {
      popup: 'swal-custom-popup',
      title: 'swal-custom-title',
      confirmButton: 'swal-custom-confirm',
      cancelButton: 'swal-custom-cancel'
    }
  });

  return result.isConfirmed;
};

export const confirmExit = async (): Promise<boolean> => {
  return confirmDialog({
    title: 'Thoát khỏi đề thi',
    text: 'Bạn có chắc chắn muốn thoát khỏi đề thi? Tất cả câu trả lời sẽ được lưu tự động.',
    confirmButtonText: 'Thoát',
    cancelButtonText: 'Tiếp tục làm bài',
    icon: 'warning',
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#3b82f6'
  });
};

export const confirmDelete = async (itemName: string = 'mục này'): Promise<boolean> => {
  return confirmDialog({
    title: 'Xóa dữ liệu',
    text: `Bạn có chắc chắn muốn xóa ${itemName}? Hành động này không thể hoàn tác.`,
    confirmButtonText: 'Xóa',
    cancelButtonText: 'Hủy',
    icon: 'warning',
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#6b7280'
  });
};

export const confirmSubmit = async (): Promise<boolean> => {
  return confirmDialog({
    title: 'Nộp bài thi',
    text: 'Bạn có chắc chắn muốn nộp bài thi? Sau khi nộp, bạn sẽ không thể chỉnh sửa câu trả lời.',
    confirmButtonText: 'Nộp bài',
    cancelButtonText: 'Tiếp tục làm bài',
    icon: 'question',
    confirmButtonColor: '#10b981',
    cancelButtonColor: '#6b7280'
  });
};

export const confirmLogout = async (): Promise<boolean> => {
  return confirmDialog({
    title: 'Đăng xuất',
    text: 'Bạn có chắc chắn muốn đăng xuất?',
    confirmButtonText: 'Đăng xuất',
    cancelButtonText: 'Hủy',
    icon: 'question',
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#6b7280'
  });
};

export const showSuccess = (title: string, text: string = '') => {
  Swal.fire({
    title,
    text,
    icon: 'success',
    confirmButtonText: 'OK',
    confirmButtonColor: '#10b981',
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false,
    customClass: {
      popup: 'swal-custom-popup',
      title: 'swal-custom-title',
      confirmButton: 'swal-custom-confirm'
    }
  });
};

export const showError = (title: string, text: string = '') => {
  Swal.fire({
    title,
    text,
    icon: 'error',
    confirmButtonText: 'OK',
    confirmButtonColor: '#ef4444',
    customClass: {
      popup: 'swal-custom-popup',
      title: 'swal-custom-title',
      confirmButton: 'swal-custom-confirm'
    }
  });
};

export const showInfo = (title: string, text: string = '') => {
  Swal.fire({
    title,
    text,
    icon: 'info',
    confirmButtonText: 'OK',
    confirmButtonColor: '#3b82f6',
    customClass: {
      popup: 'swal-custom-popup',
      title: 'swal-custom-title',
      confirmButton: 'swal-custom-confirm'
    }
  });
};
