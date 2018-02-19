package br.com.Controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.google.gson.Gson;
import br.com.DAO.DaoImplementcao;
import br.com.DAO.InterfaceDAO;
import br.com.Model.Estados;

@Controller
@RequestMapping(value = "/estados")
public class EstadosController extends DaoImplementcao<Estados> implements InterfaceDAO<Estados> {

	public EstadosController(Class<Estados> persistenceClass) {
		super(persistenceClass);

	}

	@RequestMapping(value = "listar", method = RequestMethod.GET, headers = "Accept=application/json")
	@ResponseBody
	public String listar() throws Exception {
		
		return new Gson().toJson(super.lista());
	}

	@Override
	public List<Estados> consultaPaginada(String numeroPagina) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
	
	

}
