$(function () {
    $("#btnBuscarLoc").click(function () {
        var originbtn = this.innerHTML;
        this.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

        $("#generated").hide();
        $('#generated tbody').empty();

        var ufvalor = $("#uf").val();
        var munvalor = $("#Municipio").val().replace(" ", "%20");
        var endvalor = $("#Endereco").val().replace(" ", "%20");

        if (ufvalor == "" || munvalor == "") {
            this.innerHTML = originbtn;
            MethodNotify("warning", "Atenção!", "Insira UF/Municipio", "alert");
            return;
        }
        else if (endvalor.length <= 3) {
            this.innerHTML = originbtn;
            MethodNotify("warning", "Atenção!", "Digite um endereco com mais de 3 caracteres. Quantidade atual: " + endvalor.length, "alert");
            return;
        }

        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            url: "https://viacep.com.br/ws/" + ufvalor + "/" + munvalor + "/" + endvalor + "/json/",
            success: function (retorno) {

                $("#generated").show();
                var len = retorno.length;
                for (var i = 0; i < len; i++) {

                    var cep = retorno[i].cep;
                    var logradouro = retorno[i].logradouro;
                    var complemento = retorno[i].complemento;
                    var bairro = retorno[i].bairro;
                    var localidade = retorno[i].localidade;
                    var uf = retorno[i].uf;
                    var ibge = retorno[i].ibge;
                    var gia = retorno[i].gia;

                    $("#generated").append("<tr><td>" + cep + "</td><td>" + logradouro + "</td><td>" + complemento + "</td><td>" + bairro + "</td><td>" + localidade + "</td><td>" + uf + "</td><td>" + ibge + "</td>" + "</tr>");
                }

                MethodNotify("success", "Atenção!", "Consulta realizada com sucesso.", "sucess");
            },
            error: function (msg, url, line) {
                MethodNotify("error", "Erro na busca da Localidade!", "msg = " + msg + "\n\nurl = " + url + "\n\nline = " + line, "error");
            }
        });

        this.innerHTML = originbtn;
    });
});

$(function () {
    $("#btnBuscarCep").click(function () {
        var originbtn = this.innerHTML;
        this.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

        $("#campos_retorno").hide();

        var valor = $("#Cep").val().replace('-', '').replace('.', '');
        if (valor == "") {
            this.innerHTML = '<span id="state"></span>Buscar..';
            MethodNotify("warning", "Atenção!", "Preencha o campo CEP.", "alert");
        }

        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            url: "https://viacep.com.br/ws/" + valor + "/json/",
            success: function (retorno) {
                var comp = retorno.erro;
                if (comp == true) {
                    MethodNotify("success", "Atenção!", "Cep não localizado.", "alert");
                }
                else {
                    $("#campos_retorno").show();
                    $('#lblCep').text("Cep: " + retorno.cep);
                    $('#lblLogr').text("Logradouro: " + retorno.logradouro);
                    $('#lblComp').text("Complemento: " + retorno.complemento);
                    $('#lblBair').text("Bairro: " + retorno.bairro);
                    $('#lblLoca').text("Localidade: " + retorno.localidade);
                    $('#lblUf').text("Uf: " + retorno.uf);
                    $('#lblUnid').text("Unidade :" + retorno.unidade);
                    $('#lblIbge').text("Ibge :" + retorno.ibge);
                    $('#lblGia').text("Gia: " + retorno.gia);

                    MethodNotify("success", "Atenção!", "Consulta realizada com sucesso.", "sucess");
                }
            },
            error: function (msg, url, line) {
                MethodNotify("error", "Erro na busca do Cep.", "msg = " + msg + "\n\nurl = " + url + "\n\nline = " + line, "error");
            }
        });

        this.innerHTML = originbtn;
    });
});

function MethodNotify(par_type, par_title, par_message, par_icon = "paper_plane") {

    notify({
        type: par_type, title: par_title, message: par_message, position: { x: "right", y: "bottom" }, icon: '<img src="images/' + par_icon + '.png" />',
        size: "normal", overlay: false, closeBtn: true, overflowHide: false, spacing: 20, theme: "default", autoHide: true, delay: 2500,
        onShow: null, onClick: null, onHide: null, template: '<div class="notify"><div class="notify-text"></div></div>'
    });
}

$(function () {
    $("#Cep").keypress(function (e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });
});

$(function () {
    $(document).ready(function () {
        var $seuCampoCpf = $("#Cep");
        $seuCampoCpf.mask('00.000-000', { reverse: true });
    });
});