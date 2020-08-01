$(function () {
  $('#link_reg').on('click', function () {
    $('.reg-box').show()
    $('.login-box').hide()
  })
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  // 表单检验规则
  var form = layui.form
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    repwd: function (value) {
      if (value !== $('#reg-pwd').val()) {
        return '密码不一致'
      }

    }
  })

  //注册
  var layer = layui.layer
  $('#form_reg').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/api/reguser',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status != 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);
        $('#link_login').click()
        $('#form_reg')[0].reset()
      }
    })
  })

  // 登录
  $('#form_login').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/api/login',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status != 0) {
          return layer.msg(res.message)
        }
        layer.msg(res.message)
        localStorage.setItem('token', res.token)
        location.href = "/code/index.html"
      }
    })
  })

})