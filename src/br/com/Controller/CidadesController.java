package br.com.Controller;

import java.util.List;
import org.hibernate.criterion.Restrictions;
import org.hibernate.Criteria;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import br.com.DAO.DaoImplementcao;
import br.com.DAO.InterfaceDAO;
import br.com.Model.Cidades;


@Controller
@RequestMapping(value="/cidades")
public class CidadesController extends DaoImplementcao<Cidades> implements InterfaceDAO<Cidades>{

	public CidadesController(Class<Cidades> persistenceClass) {
		super(persistenceClass);
		
	}
	
	@RequestMapping(value="listar/{idEstado}", method=RequestMethod.GET, headers = "Accept=application/json")
	@ResponseBody
	public String listar(@PathVariable("idEstado") String idEstado)throws Exception{
		return new Gson().toJson(lista(Long.parseLong(idEstado))); 
	}
	
	//dados para chrome
	@RequestMapping(value="listarchrome", method=RequestMethod.GET)
	@ResponseBody
	public String listarChrome(@RequestParam("idEstado") String idEstado) throws Exception {
		return new Gson().toJson(lista(Long.parseLong(idEstado)));
	}
	

	
	@SuppressWarnings("unchecked")
	public List<Cidades> lista(Long codigoEstado) throws Exception{
		Criteria criteria = getSessionFactory().getCurrentSession().createCriteria(getPersistenceClass());
		criteria.add(Restrictions.eq("estados.id", codigoEstado));
		return criteria.list();
	}

	@Override
	public List<Cidades> consultaPaginada(String numeroPagina) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
	
}
