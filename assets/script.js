$(document).ready(function() {

    // 1. Chuyển đổi Theme (Light Mode mặc định)
    $('#checkbox').change(function() {
        if($(this).is(':checked')) {
            $('body').addClass('orange-theme');
        } else {
            $('body').removeClass('orange-theme');
        }
    });

    // 2. Hiện/Ẩn mật khẩu (Dùng Class để chạy cho tất cả các ô password)
    $('.toggle-password').on('click', function() {
        // Tìm ô input nằm ngay trước hoặc trong cùng group với icon
        const input = $(this).closest('.input-group').find('input');
        const isPass = input.attr('type') === 'password';

        input.attr('type', isPass ? 'text' : 'password');

        // Đổi màu icon khi bật/tắt
        $(this).css('color', isPass ? '#FF6B00' : '#777');
    });

    // 3. Xử lý Submit Form chung
    $('form').on('submit', function(e) {
        e.preventDefault();

        const $form = $(this);
        const $btn = $form.find('.btn-login');
        const $text = $btn.find('.btn-text');
        const $loader = $btn.find('.loader');
        const $toast = $('#success-toast');

        // Tự động nhận diện loại form dựa trên ID
        const isRegister = $form.attr('id') === 'registerForm';
        const successMsg = isRegister ? 'Đăng ký thành công!' : 'Đăng nhập thành công!';
        const originalBtnText = $text.text();

        // Hiệu ứng Loading
        $text.hide();
        $loader.show();
        $btn.css('pointer-events', 'none');

        // Giả lập thời gian chờ server
        setTimeout(function() {
            $loader.hide();
            $text.show().text('Hoàn tất!');

            // Hiện Toast với nội dung tương ứng
            $toast.text(successMsg).addClass('show');

            setTimeout(function() {
                $toast.removeClass('show');
                $btn.css('pointer-events', 'all');
                $text.text(originalBtnText);

                // Nếu đăng nhập thành công, có thể chuyển hướng sang Dashboard sau này
                if(!isRegister) {
                    console.log("Redirecting to Dashboard...");
                }
            }, 3000);
        }, 1800);
    });
});