var permissao = false;

var app = angular.module('loja', [ 'ngRoute', 'ngResource', 'ngAnimate']);

app.config(function($routeProvider) {

			$routeProvider.when("/clientelist", {
				controller : "clienteController",
				templateUrl : "cliente/list.html"
			})// listar
			
			.when("/clienteedit/:id", {
				controller : "clienteController",
				templateUrl : "cliente/cadastro.html"
			})// editar
			
			.when("/cliente/cadastro", {
				controller : "clienteController",
				templateUrl : "cliente/cadastro.html"
			})// novo
			
			// -------------Fornecedor--------------
			$routeProvider.when("/fornecedorlist", {
				controller : "fornecedorController",
				templateUrl : "fornecedor/list.html"
			})// listar
			
			.when("/fornecedoredit/:id", {
				controller : "fornecedorController",
				templateUrl : "fornecedor/cadastro.html"
			})// editar
			
			.when("/fornecedor/cadastro", {
				controller : "fornecedorController",
				templateUrl : "fornecedor/cadastro.html"
			})// novo
			
			
			// --------------Livro---------------------
				$routeProvider.when("/livrolist", {
				controller : "livroController",
				templateUrl : "livro/list.html"
			})// listar
			
			.when("/livroedit/:id", {
				controller : "livroController",
				templateUrl : "livro/cadastro.html"
			})// editar
			
			.when("/livro/cadastro", {
				controller : "livroController",
				templateUrl : "livro/cadastro.html"
			})// novo
			
			//----------------LOJA---------------
			.when("/loja/online", {
				controller : "lojaController",
				templateUrl : "loja/online.html"
			})
			.when("/loja/itensLoja/:itens", {
				controller : "lojaController",
				templateUrl : "loja/itensLoja.html"
			})
			
			.when("/loja/pedidoconfirmado/:codigoPedido", {
				controller : "lojaController",
				templateUrl : "loja/pedidoconfirmado.html"
			})
			
			.when("/loja/pedidos", {
				controller : "lojaController",
				templateUrl : "loja/pedidos.html"
			})
			
			.when("/grafico/media_pedido", {
				controller : "lojaController",
				templateUrl : "grafico/media_pedido.html"
			})
			
			.otherwise({
				redirectTo : "/"
			});
			
			
});


app.controller("lojaController", function ($scope, $http, $location, $routeParams) {
	
	if($routeParams.itens != null && $routeParams.itens.length > 0){
		$http.get("itempedido/processar/" + $routeParams.itens).success(function(response) {
			
			$scope.itensCarrinho = response;
			
		}).error(function(data, status, headers, config) {
			erro("Error: " + status);
		});
	}
	else{
		$scope.carrinhoLivro = new Array();
	}
		$scope.addLivro = function (livroid) {
		$scope.carrinhoLivro.push(livroid);
	};
	
	$scope.fecharPedido = function() {
		$location.path('loja/itensLoja/' + $scope.carrinhoLivro);
	};


	// listar todos os livros
	$scope.listarLivro = function(numeroPagina) {
		$scope.numeroPagina = numeroPagina;// listar por pagina
		$http.get("livro/listar/" + numeroPagina).success(function(response) {

			$scope.data = response;
			
		$http.get("livro/totalPagina").success(function(response){
			
				$scope.totalPagina = response;
		}).error(function(response) {
			erro("Error: " + response);
		});
			
		}).error(function(response) {
			erro("Erro:" + response);
		});
		
	};
		
	$scope.proximo = function () {
		if(new Number($scope.numeroPagina) < new Number($scope.totalPagina)){
		$scope.listarFornecedor(new Number($scope.numeroPagina + 1));
			}
		};
	
	$scope.anterior = function () {
		if(new Number($scope.numeroPagina) > 1){
		$scope.listarFornecedor(new Number($scope.numeroPagina - 1));
		}
	};
	
});

app.controller('clienteController', function($scope, $http, $location, $routeParams) {
	
	// editar cliente
	if($routeParams.id != null && $routeParams.id != undefined && $routeParams.id != ''){
		$http.get("cliente/buscarCliente/" + $routeParams.id).success(function(response){
			$scope.cliente = response;
			
			// carregar imagem
			document.getElementById("imagemCliente").src = $scope.cliente.foto;
			
			// ------------------ carrega estados e cidades do cliente em edi��o
			setTimeout(function () {
				$("#selectEstados").prop('selectedIndex', (new Number($scope.cliente.estados.id) + 1));
				
				$http.get("cidades/listar/" + $scope.cliente.estados.id).success(function(response) {
					$scope.cidades = response;
					setTimeout(function () {
						$("#selectCidades").prop('selectedIndex', buscarKeyJson(response, 'id', $scope.cliente.cidades.id));
					}, 1000);
					
				}).error(function(data, status, headers, config) {
					erro("Error: " + status);
				});
			
			}, 1000);
			// ----------------------
			
		}).error(function(data, status, headers, config) {
			erro("Error: " + status);
		});
		
	}else { // novo cliente
		$scope.cliente = {};
	}
	
	
	$scope.editarCliente = function(id) {
		$location.path('clienteedit/' + id);
	};
	
// salvar cliente ou editar
	
	$scope.cliente = {};
	$scope.salvarCliente = function(){
		
		// salvar imagem
		$scope.cliente.foto = document.getElementById('imagemCliente').getAttribute("src");
		
		$http.post("cliente/salvar", $scope.cliente).success(function(response) {
			$scope.cliente = {};
			
			document.getElementById("imagemCliente").src="";
			
			sucesso("Salvo com sucesso!");
		}).error(function(response) {
			erro("Erro:" + response);
		});
	};
	
	$scope.proximo = function () {
		if(new Number($scope.numeroPagina) < new Number($scope.totalPagina)){
		$scope.listarClientes(new Number($scope.numeroPagina + 1));
			}
		};
	
	$scope.anterior = function () {
		if(new Number($scope.numeroPagina) > 1){
		$scope.listarClientes(new Number($scope.numeroPagina - 1));
		}
	};
	
	
	// listar todos os clientes
	$scope.listarClientes = function(numeroPagina) {
		$scope.numeroPagina = numeroPagina;// listar por pagina
		$http.get("cliente/listar/" + numeroPagina).success(function(response) {

			$scope.data = response;
			
		$http.get("cliente/totalPagina").success(function(response){
			
				$scope.totalPagina = response;
		}).error(function(response) {
			erro("Error: " + response);
		});
			
		}).error(function(response) {
			erro("Erro:" + response);
		});
		
	};
	
	$scope.removerCliente = function(codCliente){
		$http.delete("cliente/deletar/" + codCliente).success(function(response){
			$scope.listarClientes($scope.numeroPagina);
			sucesso("Removido com sucesso!");
		}).error(function(data, status, headers, config) {
			erro("Erro:" + status);
		});
	};
	
	// carrega as cidades de acordo com o estado passado por parametro
	$scope.carregarCidades = function(estado) {
		if (identific_nav() != 'chrome') {// executa se for diferente do
											// chrome
			$http.get("cidades/listar/" + estado.id).success(function(response) {
				$scope.cidades = response;
			}).error(function(data, status, headers, config) {
				erro("Error: " + status);
			});
	  }
	};
	
	// carrega os estados ao iniciar a tela de cadastro
	$scope.carregarEstados = function() {
		$scope.dataEstados = [{}];
		$http.get("estados/listar").success(function(response) {
			$scope.dataEstados = response;
		}).error(function(response) {
			erro("Error: " + response);
		});
	};
	
});

// configurações fornecedorController
app.controller('fornecedorController', function($scope, $http, $location, $routeParams) {
	
	// editar fornecedor
	if($routeParams.id != null && $routeParams.id != undefined && $routeParams.id != ''){
		$http.get("fornecedor/buscarFornecedor/" + $routeParams.id).success(function(response){
			$scope.fornecedor = response;
			
			// carregar imagem
			document.getElementById("imagemFornecedor").src = $scope.fornecedor.foto;
			
			// ------------------ carrega estados e cidades do fornecedor em
			// edi��o
			setTimeout(function () {
				$("#selectEstados").prop('selectedIndex', (new Number($scope.fornecedor.estados.id) + 1));
				
				$http.get("cidades/listar/" + $scope.fornecedor.estados.id).success(function(response) {
					$scope.cidades = response;
					setTimeout(function () {
						$("#selectCidades").prop('selectedIndex', buscarKeyJson(response, 'id', $scope.fornecedor.cidades.id));
					}, 1000);
					
				}).error(function(data, status, headers, config) {
					erro("Error: " + status);
				});
			
			}, 1000);
			// ----------------------
			
		}).error(function(data, status, headers, config) {
			erro("Error: " + status);
		});
		
	}else { // novo fornecedor
		$scope.fornecedor = {};
	}
	
	
	$scope.editarFornecedor = function(id) {
		$location.path('fornecedoredit/' + id);
	};
	
// salvar fornecedor ou editar
	
	$scope.fornecedor = {};
	$scope.salvarFornecedor = function(){
		
		// salvar imagem
		$scope.fornecedor.foto = document.getElementById('imagemFornecedor').getAttribute("src");
		
		$http.post("fornecedor/salvar", $scope.fornecedor).success(function(response) {
			$scope.fornecedor = {};
			
			document.getElementById("imagemFornecedor").src="";
			
			sucesso("Salvo com sucesso!");
		}).error(function(response) {
			erro("Erro:" + response);
		});
	};
	
	$scope.proximo = function () {
		if(new Number($scope.numeroPagina) < new Number($scope.totalPagina)){
		$scope.listarFornecedor(new Number($scope.numeroPagina + 1));
			}
		};
	
	$scope.anterior = function () {
		if(new Number($scope.numeroPagina) > 1){
		$scope.listarFornecedor(new Number($scope.numeroPagina - 1));
		}
	};
	
	
	// listar todos os fornecedor
	$scope.listarFornecedor = function(numeroPagina) {
		$scope.numeroPagina = numeroPagina;// listar por pagina
		$http.get("fornecedor/listar/" + numeroPagina).success(function(response) {

			$scope.data = response;
			
		$http.get("fornecedor/totalPagina").success(function(response){
			
				$scope.totalPagina = response;
		}).error(function(response) {
			erro("Error: " + response);
		});
			
		}).error(function(response) {
			erro("Erro:" + response);
		});
		
	};
	
	$scope.removerFornecedor = function(codFornecedor){
		$http.delete("fornecedor/deletar/" + codFornecedor).success(function(response){
			$scope.listarFornecedor($scope.numeroPagina);
			sucesso("Removido com sucesso!");
		}).error(function(data, status, headers, config) {
			erro("Erro:" + status);
		});
	};
	
	
	
	// carrega as cidades de acordo com o estado passado por parametro
	$scope.carregarCidades = function(estado) {
		if (identific_nav() != 'chrome') {// executa se for diferente do
											// chrome
			$http.get("fornecedor/listar/" + estado.id).success(function(response) {
				$scope.cidades = response;
			}).error(function(data, status, headers, config) {
				erro("Error: " + status);
			});
	  }
	};
	
	// carrega os estados ao iniciar a tela de cadastro
	$scope.carregarEstados = function() {
		$scope.dataEstados = [{}];
		$http.get("estados/listar").success(function(response) {
			$scope.dataEstados = response;
		}).error(function(response) {
			erro("Error: " + response);
		});
	};
	
});


// Configurações livroController

app.controller('livroController', function($scope, $http, $location, $routeParams) {
	
	// editar livro
	if($routeParams.id != null && $routeParams.id != undefined && $routeParams.id != ''){
		$http.get("livro/buscarlivro/" + $routeParams.id).success(function(response){
			$scope.livro = response;
			
			// carregar imagem
			document.getElementById("imagemLivro").src = $scope.livro.foto;
			
			// ----------------------Listar todos os fornecedores
			
		$http.get("fornecedor/listartodos").success(function(response){
			$scope.fornecedoresList = response;
			setTimeout(function() {
				$("#selectFornecedor").prop('selectedIndex', buscarKeyJson(response,'id',$scope.livro.fornecedor.id));
			}, 1000);
			
		}).error(function(data, status, headers, config) {
			erro("Error: " + status);
		});
		
		}).error(function(data, status, headers, config) {
			erro("Error: " + status);
		});
		
	}else { // novo livro
		$scope.livro = {};
	}
	
	
	$scope.editarLivro = function(id) {
		$location.path('livroedit/' + id);
	};
	
// salvar livro ou editar
	
	$scope.livro = {};
	$scope.salvarLivro = function(){
		
		// salvar imagem
		$scope.livro.foto = document.getElementById('imagemLivro').getAttribute("src");
		
		$http.post("livro/salvar", $scope.livro).success(function(response) {
			$scope.livro = {};
			
			document.getElementById("imagemLivro").src="";
			
			sucesso("Salvo com sucesso!");
		}).error(function(response) {
			erro("Erro:" + response);
		});
	};
	
	$scope.proximo = function () {
		if(new Number($scope.numeroPagina) < new Number($scope.totalPagina)){
		$scope.listarLivro(new Number($scope.numeroPagina + 1));
			}
		};
	
	$scope.anterior = function () {
		if(new Number($scope.numeroPagina) > 1){
		$scope.listarLivro(new Number($scope.numeroPagina - 1));
		}
	};
	
	
	// listar todos os livros
	$scope.listarLivro = function(numeroPagina) {
		$scope.numeroPagina = numeroPagina;// listar por pagina
		$http.get("livro/listar/" + numeroPagina).success(function(response) {

			$scope.data = response;
			
		$http.get("livro/totalPagina").success(function(response){
			
				$scope.totalPagina = response;
		}).error(function(response) {
			erro("Error: " + response);
		});
			
		}).error(function(response) {
			erro("Erro:" + response);
		});
		
	};
	
	$scope.removerLivro = function(codLivro){
		$http.delete("livro/deletar/" + codLivro).success(function(response){
			$scope.listarLivro($scope.numeroPagina);
			sucesso("Removido com sucesso!");
		}).error(function(data, status, headers, config) {
			erro("Erro:" + status);
		});
	};
	

	$scope.listarFornecedores = function(){
		$http.get("fornecedor/listartodos").success(function(response){
			$scope.fornecedoresList = response;				
		}).error(function(data, status, headers, config) {
			erro("Error: " + status);
		});
		
	};
	
});



function sucesso(msg){
    	$.notify({
        	message: msg

        },{
            type: 'success',
            timer: 1000
        });
}

function erro(msg){
	$.notify({
    	message: msg

    },{
        type: 'danger',
        timer: 1000
    });
}
function buscarKeyJson(obj, key, value)
{
    for (var i = 0; i < obj.length; i++) {
        if (obj[i][key] == value) {
            return i + 2;
        }
    }
    return null;
}

function carregarCidadesChrome(estado) {
	if (identific_nav() === 'chrome') {// executa se for chrome
		$.get("cidades/listarchrome", { idEstado : estado.value}, function(data) {
			 var json = JSON.parse(data);
			 html = '<option value="">Selecione a Cidade</option>';
			 for (var i = 0; i < json.length; i++) {
				  html += '<option value='+json[i].id+'>'+json[i].nome+'</option>';
			 }
			 $('#selectCidades').html(html);
		});
  }
}


// identificar navegador
function identific_nav(){
    var nav = navigator.userAgent.toLowerCase();
    if(nav.indexOf("msie") != -1){
       return browser = "msie";
    }else if(nav.indexOf("opera") != -1){
    	return browser = "opera";
    }else if(nav.indexOf("mozilla") != -1){
        if(nav.indexOf("firefox") != -1){
        	return  browser = "firefox";
        }else if(nav.indexOf("firefox") != -1){
        	return browser = "mozilla";
        }else if(nav.indexOf("chrome") != -1){
        	return browser = "chrome";
        }
    }else{
    	alert("Navegador desconhecido!");
    }
}

function visualizarImg() {
	 var preview = document.querySelectorAll('img').item(1);
	  var file    = document.querySelector('input[type=file]').files[0];
	  var reader  = new FileReader();

	  reader.onloadend = function () {
	    preview.src = reader.result;// carrega em base64 a img
	  };

	  if (file) {
	    reader.readAsDataURL(file);		    
	  } else {
	    preview.src = "";
	  }
	  
}
