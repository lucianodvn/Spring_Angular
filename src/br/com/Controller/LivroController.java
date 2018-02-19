package br.com.Controller;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import br.com.DAO.DaoImplementcao;
import br.com.DAO.InterfaceDAO;
import br.com.Model.Livro;

@Controller
@RequestMapping(value = "/livro")
public class LivroController extends DaoImplementcao<Livro> implements InterfaceDAO<Livro> {

	public LivroController(Class<Livro> persistenceClass) {
		super(persistenceClass);

	}

	@RequestMapping(value = "salvar", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity salvar(@RequestBody String jsonLivro) throws Exception {
		Livro livro = new Gson().fromJson(jsonLivro, Livro.class);

		//if (livro != null && livro.getAtivo() == null) {
			//livro.setAtivo(false);
		//}

		super.salvarOuAtualizar(livro);
		return new ResponseEntity(HttpStatus.CREATED);
	}

	@RequestMapping(value = "listar/{numeroPagina}", method = RequestMethod.GET)
	@ResponseBody
	public String listar(@PathVariable("numeroPagina") String numeroPagina) throws Exception {

		return new Gson().toJson(super.consultaPagina(numeroPagina));
	}
	
	@RequestMapping(value="totalPagina", method=RequestMethod.GET,headers = "Accept=application/json")
	@ResponseBody
	public String totalPagina() throws Exception{
		return ""+super.quantidadePagina();
	}
	

	@RequestMapping(value="deletar/{codLivro}", method=RequestMethod.DELETE)
	public  @ResponseBody String deletar (@PathVariable("codLivro") String codLivro) throws Exception {
		super.deletar(loadObjeto(Long.parseLong(codLivro)));
		return "";
	}

	@RequestMapping(value = "buscarlivro/{codLivro}", method = RequestMethod.GET)
	public @ResponseBody String buscarlivro(@PathVariable("codLivro") String codLivro) throws Exception {
		Livro objeto = super.loadObjeto(Long.parseLong(codLivro));
		if (objeto == null) {
			return "{}";
		}
		return new Gson().toJson(objeto);

	}


	@Override
	public List<Livro> consultaPaginada(String numeroPagina) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

}
