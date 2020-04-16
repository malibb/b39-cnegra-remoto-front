import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Post from '../views/Post';
import { MockedProvider } from '@apollo/react-testing';
import gql from 'graphql-tag';
import wait from 'waait';

const ONE_POST=gql`
    query getOne($id:ID!){
    getPostById(id:$id){
      author{
        first_name
      }
      title
      content
      cover
    }
  }
`;

const mockClient = [{
    request: {
        query: ONE_POST,
    },
    result: {
        data: {
            getPostById: {
                author: {
                    first_name: "Mali"
                  },
                  title:"post 1",
                  content:"postsdcfvdv",
                  cover:"https",
            }
        }
    }
},
];

//Mount prop, state, lifecycle
describe('<Post/>', () => {
    it('Simple Rendering', ()=> {
        const component = mount(
            <MockedProvider mocks={mockClient}>
               <Router>
                    <Switch>
                        <Post/>
                    </Switch>
                </Router> 
            </MockedProvider>
        );
        expect(component).toMatchSnapshot();
    });

    it('Complete full request', ()=> {
        act(()=> {
            const executeTest = async() => {
                const component = mount(
                    <MockedProvider mocks={mockClient}>
                       <Router>
                            <Switch>
                                <Post />
                            </Switch>
                        </Router> 
                    </MockedProvider>
                );
                await wait(0);

                expect(component.find('.footer-post').text()).toBe('@Postealo.com');
            }

            executeTest();
        })
    })

});
