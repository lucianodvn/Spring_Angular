	package br.com.Controller;

	import java.util.List;

	import org.springframework.http.HttpStatus;
	import org.springframework.http.ResponseEntity;
	import org.springframework.stereotype.Controller;
	import org.springframework.web.bind.annotation.PathVariable;
	import org.springframework.web.bind.annotation.RequestBody;
	import org.springframework.web.bind.annotation.RequestMapping;
	import org.springframework.web.bind.annotation.RequestMethod;
	import org.springframework.web.bind.annotation.ResponseBody;
	import com.google.gson.Gson;
	import br.com.DAO.DaoImplementcao;
	import br.com.DAO.InterfaceDAO;
	import br.com.Model.Fornecedor;


	@Controller
	@RequestMapping(value = "/fornecedor")
	public class FornecedorController extends DaoImplementcao<Fornecedor> implements InterfaceDAO<Fornecedor> {

		public FornecedorController(Class<Fornecedor> persistenceClass) {
			super(persistenceClass);

		}

		@RequestMapping(value = "salvar", method = RequestMethod.POST)
		@ResponseBody
		public ResponseEntity salvar(@RequestBody String jsonFornecedor) throws Exception {
			Fornecedor fornecedor = new Gson().fromJson(jsonFornecedor, Fornecedor.class);

			if (fornecedor != null && fornecedor.getAtivo() == null) {
				fornecedor.setAtivo(false);
			}

			super.salvarOuAtualizar(fornecedor);
			return new ResponseEntity(HttpStatus.CREATED);
		}

		@RequestMapping(value = "listar/{numeroPagina}", method = RequestMethod.GET, headers = "Accept=application/json")
		@ResponseBody
		public String listar(@PathVariable("numeroPagina") String numeroPagina) throws Exception {

			return new Gson().toJson(super.consultaPagina(numeroPagina));
		}
		
		@RequestMapping(value = "listartodos", method = RequestMethod.GET, headers = "Accept=application/json")
		@ResponseBody
		public String listartodos()
				throws Exception {
			return new Gson().toJson(super.lista());
		}
		
		@RequestMapping(value="totalPagina", method=RequestMethod.GET,headers = "Accept=application/json")
		@ResponseBody
		public String totalPagina() throws Exception{
			return ""+super.quantidadePagina();
		}
		

		@RequestMapping(value = "deletar/{codFornecedor}", method = RequestMethod.DELETE)
		public @ResponseBody
		String deletar(@PathVariable("codFornecedor") String codFornecedor)
				throws Exception {
			super.deletar(loadObjeto(Long.parseLong(codFornecedor)));
			return "";
		}

		@RequestMapping(value = "buscarFornecedor/{codFornecedor}", method = RequestMethod.GET)
		public @ResponseBody String buscarFornecedor(@PathVariable("codFornecedor") String codFornecedor) throws Exception {
			Fornecedor objeto = super.loadObjeto(Long.parseLong(codFornecedor));
			if (objeto == null) {
				return "{}";
			}
			return new Gson().toJson(objeto);

		}

		@Override
		public List<Fornecedor> consultaPaginada(String numeroPagina) throws Exception {
			// TODO Auto-generated method stub
			return null;
		}

		
	}



